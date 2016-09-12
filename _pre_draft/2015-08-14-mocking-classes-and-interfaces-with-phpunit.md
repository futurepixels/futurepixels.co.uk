---
layout: post
title: Mocking classes and interfaces with PHPUnit
description: This weeks lession is learning how to mock final classes in PHPUnit.
keywords: php, phpunit, mock, mocking, final classes, classes, interfaces
categories: learning-per-week
twitter:
  author: Nigel Greenway
---

This is the first article in [hopefully] a weekly thing about what I have learn't the week, wether this is multiple things or something significant.

This being the first will be just on one thing; mocking a class in [PHPUnit](http://phpunit.de).

Hope you enjoy and/or learn something from it.

## What is a mock?

Glad you asked. There are two great articles that do a better job explaining what it is. The [first](https://adamcod.es/2014/05/15/test-doubles-mock-vs-stub.html#mocks) is a good brief explaination by [Adam Brett](https://twitter.com/sixdaysad/).

If you want a more of a thurough explaination (by [Martin Fowler](https://twitter.com/martinfowler)), [this](http://martinfowler.com/articles/mocksArentStubs.html) will satisfy that itch.

## Oh, the caveats...

So, I write all my PHP classes with the `final` keyword first (and yes I know it is limiting and blah, blah, blah but [read this](http://verraes.net/2014/05/final-classes-in-php/) and [this](http://ocramius.github.io/blog/when-to-declare-classes-final/) for my reasons, as it works for me).

My issue this week was that I wanted to test a class that used another class as a parameter. For example; `CurrencyConverter#convertTo($value, Currency $currency)` which would return a new value depending on the currency exchange rate.

Before, I would have created the `Currency` class as `final` along with the `CurrencyConverter` and my initial solution was to create a small hydration class. After some discussions with people from [PHP East Midlands](http://phpem.uk/) and [Marco Pivetta](https://twitter.com/Ocramius) about what I had done, it was apparent that although it was doing the job, I was not doing it the best way.

There were two proposed solutions:

- Remove the `final` keyword from the class
- Use interfaces and mock the interface

Don't see the removal of the `final` keyword as a solution for me personally.

So, I went with using interfaces. This would make it so easy to mock `CurrencyInterface`. For example my object to be tested looks like this:

	final class CurrencyConverter
	{
		public function getExchangeRate(
			         $value,
			Currency $currency
		) {
			if ($currency->getExchangeRate() === 1.00) {
				return $value;
			}

			return $value * $currency->getExchangeRate();
		}
	}

Instead of hydrating the `Currency` with the desired properties and passing it to the `CurrencyConverter` to get the tests failing/passing, in my `CurrencyConverterTest` I can build an `CurrencyInterface` which I can add the methods as I need them for other classes. I am trying to get into [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development), so this is a great case to use this methodology to get into the TDD practise.

So, I create my `CurrencyInterface` with the desired method of `getExchangeRate` like so:

	interface CurrencyInterface
	{
		public function getExchangeRate();
	}

I can concentrate on the test in hand instead of having to build the `Currency` class and test that as well. So, I can build the mock by doing the following in the `CurrencyConverterTest`:

	public function setUp()
	{
		$this->currencyMock = $this
			->getMockBuilder(CurrencyInterface::class)
			->setMethods(['getExchangeRate'])
			->getMock();
	}

I can now use that mock in my test for the `CurrencyConverter`. This gives me the ability to pass the mocked `Currency` class to the `CurrencyConverter#convertTo` and it will work fine. I need to set a value for the `getExchangeRate` to return in order for the test to run.

	public function test_the_same_value_has_been_returned_when_currency_is_GBP()
	{
		$currencyMock = $this->currencyMock;

		$currency
			->expects($this->once())
			->method('getExchangeRate')
			->will($this->returnValue(1.00));

		$this
			->assertEquals(
				10.00,
				$this->currencyConverter->convertTo(
					10.00,
					$currency
				)
			);
	}

Above, we are using the following methods from `PHPUnit_Framework_TestCase`:

• **expects**: Set the expectation that the this following method is only to be called once.  
&nbsp;&nbsp;&nbsp;&nbsp;_If you know the method would be called multiple times within the test, you can use `$this->any()`._  
• **method**: Give the method name that is going to be called within the class you are testing  
• **will**: Set the value that the method will return  

```
public function test_the_value_has_been_converted_when_currency_is_USD()
{
	$currencyMock = $this->currencyMock;

	$currency
		->expects($this->any())
		->method('getExchangeRate')
		->will($this->returnValue(1.5674));

	$this
		->assertEquals(
			15.67,
			$this->currencyConverter->convertTo(
				10.00,
				$currency
			)
		);
}
```

The above test will pass. Yey...

## More to take from this

This is great. I can still use final and create an interface. My only issue is that my entities would all have an interface, which means more files to maintain? Well, yeah, but that is not the point of designing.

An interface is a contract, it says; "implementing me? You must do all of the things here". So, to define an interface for an entity is a good thing as we are explicitly saying that we are expecting an entity to have the given methods.

This has made me look into mocking more, which I then found that mocking a class does need to be done with an existing class.