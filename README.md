# Selenium Pauser

When you are using the [Selenium Driver](http://seleniumhq.github.io/selenium/docs/api/javascript/), you may not want to quit the browser for debugging. It will be able to pause at the specified place by using the Selenium Pauser.


## Usage



```js
import pauser from 'selenium-pauser';

driver.findElements(By.css('.tlFrameView .tlLineView'))
  .then((elems) => {
    return driver.actions()
      .mouseMove(elems[lineIndex].findElement(By.css('.tlHourView._'+hour+' .tlMinView._15')), {x:1, y:1})
      .click()
      .perform();
  }).then(() => pauser.pause()).then(() => {
    return driver.wait(() => {
      dialogElem = driver.findElement(By.css('.event-dialog'));
      return dialogElem.isDisplayed();
    }, 4000)
  }).then(() => new FirstView(driver, dialogElem));
```

The return value of `pauser.pause()` is an instance of `Promise`. You just call the `pauser.pause()` at the place you want to stop in the `then` function.

If you want to pass an arguments to the next "Promise chain", please pass the first argument of "pauser.pause ()".

```js
    page.load()
      .then(() => page.openDialog(1, 10)) //openDialog returns `firstView` instance to the next promise.
      .then((firstView) => pauser.pause(firstView))
      .then((firstView) => console.log(firstView))
      ;
```

This code is equivalent below:

```js
    page.load()
      .then(() => page.openDialog(1, 10)) //openDialog returns `firstView` instance to the next promise.
      .then((firstView) => pauser.pause().then(() => firstView))
      .then((firstView) => console.log(firstView))
      ;
```