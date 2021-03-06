/**
 * If the this mechanism is so confusing, even to seasoned JavaScript developers,
 * one may wonder why it’s even useful. Is it more trouble than it’s worth?
 * Before we jump into the how, we should examine the why
 *
 */


function idendify(){
  return this.name.toUpperCase();
}

function say(){
  let greeting = "Hello, I'm " + idendify.call(this)
  console.log('use this')
  console.log(greeting)
}

var me = {
  name: "ibrahem ghaemi"
}

var you = {
  name: "fatemeh"
}

idendify.call(me)
idendify.call(you)

say.call(me)
say.call(you)

console.log('------------')

/**
 * If the how of this snippet confuses you, don’t worry! We’ll get to that shortly.
 * Just set those questions aside briefly so we can look into the why more clearly.
 * This code snippet allows the identify() and speak() functions to be reused against
 * multiple context objects (me and you), rather than need‐ ing a separate version
 * of the function for each object.
 */

 /**
  * Instead of relying on this, you could have explicitly passed in a context
  * object to both identify() and speak()
  */

  function otherIdentify (context) {
    return context.name.toUpperCase()
  }

  function otherSay (context) {
    let greeting = "Hello I'm " + otherIdentify(context);

    console.log(greeting)
  }


  otherIdentify(me)
  otherIdentify(you)

  otherSay(me)
  otherSay(you)

  console.log('------------')


  /**
   * However, the this mechanism provides a more elegant way of implicitly
   * “passing along” an object reference, leading to cleaner API design and easier reuse.
   *
   * The more complex your usage pattern is, the more clearly you’ll see that passing
   * context around as an explicit parameter is often messier than passing around a this context.
   * When we explore objects and prototypes, you will see the helpfulness of a collection of
   * functions being able to automatically reference the proper context object.
   */


   /**
    * Confusions
    *
    * We’ll soon begin to explain how this actually works, but first we must
    * dispel some misconceptions about how it doesn’t actually work
    *
    * The name “this” creates confusion when developers try to think about
    * it too literally. There are two meanings often assumed, but both are incorrect.
    *
    */

  /**
   * itself
   *
   * Developers new to JavaScript’s mechanisms often think that referenc‐
   * ing the function as an object (all functions in JavaScript are objects!)
   * lets you store state (values in properties) between function calls.
   *
   * Consider the following code, where we attempt to track how many times a function (foo) was called:
   */

   function foo(num) {
     console.log("foo: " + num)

     this.count++
   }

   foo.count = 0

   for(var i = 0; i < 5; i++) {
     foo(i)
   }

   console.log(foo.count)

   /**
    *
    * Instead of stopping at this point and digging into why the this
    * reference doesn’t seem to be behaving as expected, and answering those
    * tough but important questions, many developers simply avoid the issue altogether,
    * and hack toward some other solution, such as creating another object to hold the count property:
    *
    */

    function bar(num){
      console.log('Bar: ' + num)

      ++data.count
    }

    let data = {
      count: 0
    }

    for(var i = 0; i < 5; i++) {
      bar(i)
    }

    console.log(data.count)


    /**
     *
     * While it is true that this approach “solves” the problem, unfortunately
     * it simply ignores the real problem—lack of understanding what this
     * means and how it works—and instead falls back to the comfort zone
     * of a more familiar mechanism: lexical scope.
     * Consider these two functions:
     */

     function fooBar(num){
       fooBar.count = num
     }

     setTimeout(function(){

     }, 10)

     /**
      * So another solution to our running example would have been to use
      * the foo identifier as a function object reference in each place, and not
      * use this at all, which works.
      */

      function barFoo(num){
        console.log("barFoo: " + num)
        barFoo.count++;
      }

      barFoo.count = 0

      for(var i = 0; i < 5; i++) {
        // barFoo(i)
        barFoo.call(barFoo, i)
      }

      console.log(barFoo.count)


      /**
       * Its Scope
       *
       * The next most common misconception about the meaning of this is
       * that it somehow refers to the function’s scope.
       * It’s a tricky question because in one sense there is some truth,
       * but in the other sense, it’s quite misguided
       * To be clear, this does not, in any way, refer to a function’s lexical scope.
       * It is true that internally, scope is kind of like an object with properties for
       * each of the available identifiers. But the scope “object” is not accessible
       * to JavaScript code. It’s an inner part of the engine’s implementation.
       */

       /**
        * Consider code that attempts (and fails!) to cross over the boundary and
        * use this to implicitly refer to a function’s lexical scope:
        */

        function fooScope(){
          var a = 2;
          this.barScope()
        }

        function barScope(){
          console.log(this.a)
        }

        //fooScope() // TypeError: this.barScope is not a function
