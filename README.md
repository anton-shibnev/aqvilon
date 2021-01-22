# Eva App (akvilon-bc)

akvilon-bc application

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Links
[База знаний](https://office.allio.ru/youtrack/articles/SD-A-1/%D0%A1%D0%B0%D0%B9%D1%82-%D0%91%D0%A6-%D0%90%D0%BA%D0%B2%D0%B8%D0%BB%D0%BE%D0%BD-Links)
[Front-end repo](https://office.allio.ru/git/Sites/eva-front)

[Docs](https://office.allio.ru/youtrack/articles/SD-A-1/%D0%A1%D0%B0%D0%B9%D1%82-%D0%91%D0%A6-%D0%90%D0%BA%D0%B2%D0%B8%D0%BB%D0%BE%D0%BD-Links)

[Client design](https://www.figma.com/file/cpeW88GNU7dqaHB01RpcZP/EV.A-Catalogue-1st-Iteration-08.09.20?node-id=0%3A1)

[Admin design](https://www.figma.com/file/rFshby47paeKHwUVWbS6oB/%D0%9F%D1%80%D0%BE%D1%82%D0%BE%D1%82%D0%B8%D0%BF-%D0%90%D0%B4%D0%BC%D0%B8%D0%BD%D0%BA%D0%B0-%D0%A1%D0%BC%D0%B0%D1%80%D1%82-%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0?node-id=8%3A7043)

[Dev site](TBA)

[Stage site](TBA)

[Prod site](TBA)

#Site URLs

Все возможные ссылки на сайте EVA:

## /admin
- /complex-list/ - список ЖК пользователя
- /complex-list/:id - Просмотр объекта(строения) из ЖК по id
- /complex-list/:id/flats/:flatId -  Просмотр помещений объекта из ЖК
- /editor/complex/:id/:renderId Редактирование рендера ЖК по id в визуальном редакторе
- /editor/building/:id/:renderId Редактирование рендера объекта(строения) по id в визуальном редакторе
- /editor/building/:id/floor/:floorId Редактирование этажа объекта(строения) по id строения и по floorId - номеру этажа в визуальном редакторе





# TypeScript usage rules

## general

### types
all basic [types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

```ts
    let hex: number = 0xf00d;
    let color: string = "blue";
    let list: number[] = [1, 2, 3];
    // Declare a tuple type
    let x: [string, number];
    enum Color {
      Red,
      Green,
      Blue,
    }
    // void type (nothing return)
    function warnUser(): void {
      console.log("This is my warning message");
    }
    // String type (returns string)
    function reverse(s: string): string {
      return s.split("").reverse().join("");
    }
```


### generics
see how and when to use [generic types in ts](https://www.typescriptlang.org/docs/handbook/generics.html)

```ts
    function identity<T>(arg: T): T {
      return arg;
    }
```

### decorators
click to see [decorators](https://habr.com/ru/post/494668/)

```ts
    @Watch("firstName")
      onFirstNameChanged() {
        this.lastName = this.initialLastName + this.counter++;
      }
```

### interfaces
click to see [basics of interface inherent](https://www.typescriptlang.org/docs/handbook/interfaces.html)

```ts
    interface SquareConfig {
      color?: string;
      width: number;
    }
```

### classes

click to learn more about [classes in ts](https://www.typescriptlang.org/docs/handbook/classes.html)

In TypeScript, we can use common object-oriented patterns.
One of the most fundamental patterns in class-based programming is being able to extend existing classes to create new ones using inheritance.

```ts
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

```
### Public, private, and protected modifiers

"Public by default" <br />
 we’re able to freely **access the members that we declared throughout our programs**

 ```ts
    class Animal {
      public name: string;

      public constructor(theName: string) {
        this.name = theName;
      }

      public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
      }
    }
 ```
"private" <br />
TypeScript also has its own way to declare a member as being marked private, it cannot be accessed from outside of its containing class.

``` ts
class Animal {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

new Animal("Cat").name; // can't access name()

```

Understanding **protected** <br />

The protected modifier acts much like the private modifier with the exception that members declared protected can also be accessed within deriving classes. For example,

``` ts
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // Property 'name' is protected and only accessible within class 'Person' and its subclasses.
```

### Accessors

TypeScript supports getters/setters as a way of intercepting accesses to a member of an object. <br />
This gives you a way of having finer-grained control over how a member is accessed on each object.

``` ts
const fullNameMaxLength = 10;

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName;
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";

if (employee.fullName) {
  console.log(employee.fullName);
}

```

While allowing people to randomly set fullName directly is pretty handy, we may also want enforce some constraints when fullName is set.

In this version, we add a setter that checks the length of the newName to make sure it’s compatible with the max-length of our backing database field. If it isn’t we throw an error notifying client code that something went wrong.

To preserve existing functionality, we also add a simple getter that retrieves fullName unmodified.



# Vue TypeScript Class Based Single File Component

### Component

``` ts
  <template>
     <Label class="message" :text="msg" col="0" row="0"/>
   </template>

   <script lang="ts">
   import { Component, Prop, Vue } from "vue-property-decorator";
   @Component
   export default class MyComp extends Vue {
     @Prop() private msg: string;
   }
   </script>

```

Notice instead of the default export being a JavaScript object, here we're exporting a class. <br />
And instead of importing Vue from vue, we're importing it from vue-property-decorator.
**!!! Don't forget the @Component decorator on the class. !!!**


### Data

data is really simple with class components. It's just properties on the class:

``` ts
    <template>
      <StackLayout class="form">
        <StackLayout class="input-field">
          <Label text="First Name" class="label font-weight-bold m-b-5"/>
          <TextField v-model="firstName" hint="First Name" class="input input-border"/>
        </StackLayout>
      </StackLayout>
    </template>

    <script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class PersonClassComponent extends Vue {
      @Prop() whatToSay: string;

      //Data
      counter = 1;
      firstName = "Donna";
      initialLastName = "Summer";
      lastName = this.initialLastName;
    }
    </script>
```

### Watch

Watchers are probably the most complicated part because they are defined as class methods with a @Watch decorator. <br />
The @Watch decorator has to specify what property we're spying on.


``` ts

<template>
  <StackLayout class="form">
    <StackLayout class="input-field">
      <Label text="First Name" class="label font-weight-bold m-b-5"/>
      <TextField v-model="firstName" hint="First Name" class="input input-border"/>
    </StackLayout>
  </StackLayout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class PersonClassComponent extends Vue {
  @Prop() whatToSay: string;
  counter = 1;
  firstName = "Donna";
  initialLastName = "Summer";
  lastName = this.initialLastName;

  //Here we define a Watch
  @Watch("firstName")
  onFirstNameChanged() {
    this.lastName = this.initialLastName + this.counter++;
  }
}
</script>

```

### computed

Computeds are are executed exactly how they should be in a class - as getter (and setter) properties.

``` ts
<template>
  <StackLayout class="form">
    <StackLayout class="input-field">
      <Label text="First Name" class="label font-weight-bold m-b-5"/>
      <TextField v-model="firstName" hint="First Name" class="input input-border"/>
    </StackLayout>

    <StackLayout class="input-field">
      <Label text="Full Name" class="label font-weight-bold m-b-5"/>
      <Label :text="fullName"/>
    </StackLayout>
  </StackLayout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class PersonClassComponent extends Vue {
  @Prop() whatToSay: string;
  counter = 1;
  firstName = "Donna";
  initialLastName = "Summer";
  lastName = this.initialLastName;

  //Computed
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Watch("firstName")
  onFirstNameChanged() {
    this.lastName = this.initialLastName + this.counter++;
  }
}
</script>
```

### Methods

Methods are just class methods! <br />
Declare an event handler in the template, and then just write a method in your class.

``` ts
   <template>
     <StackLayout class="form">
       <StackLayout class="input-field">
         <Label text="First Name" class="label font-weight-bold m-b-5"/>
         <TextField v-model="firstName" hint="First Name" class="input input-border"/>
       </StackLayout>

       <StackLayout class="input-field">
         <Label text="Full Name" class="label font-weight-bold m-b-5"/>
         <Label :text="fullName"/>
       </StackLayout>

       <Button text="SPEAK" @tap="speak"/>
     </StackLayout>
   </template>

   <script lang="ts">
   import { Vue, Component, Prop, Watch } from "vue-property-decorator";

   @Component
   export default class PersonClassComponent extends Vue {
     @Prop() whatToSay: string;

     counter = 1;
     firstName = "Donna";
     initialLastName = "Summer";
     lastName = this.initialLastName;

     get fullName() {
       return `${this.firstName} ${this.lastName}`;
     }

     @Watch("firstName")
     onFirstNameChanged() {
       this.lastName = this.initialLastName + this.counter++;
     }

     //And here is the method
     speak() {
       alert("This is " + this.fullName + " speaking. " + this.whatToSay);
     }
   }
   </script>
```

### lifecycle hooks

** !!! A Vue component has eight lifecycle hooks, including created , mounted , etc., and the same TypeScript syntax is used for each hook !!! **

``` ts
export default class HelloWorld extends Vue {
  mounted() {
    //do something
  }
  beforeUpdate() {
    // do something
  }
}
```

### emit decorator

To emit a method from a child component to a parent component, we’ll use the @Emit decorator in TypeScript.

``` ts
@Emit()
addToCount(n: number) {
  this.count += n
}
@Emit('resetData')
resetCount() {
  this.count = 0
}
```


In the first example, function name addToCount is converted to kebab-case, very similarly to how the Vue emit works.

In the second example, we pass the explicit name resetData for the method, and that name is used instead. Since addData is in CamelCase, it is converted to kebab-case again.

``` ts
<some-component add-to-count="someMethod" />
<some-component reset-data="someMethod" />
```

### old "Mixins" now using just like a class extension

The **static** keyword defines a static method for a class. Static methods aren't called on instances of the class. <br />
Instead, they're called on the class **itself**. These are often utility functions, such as functions to create or clone objects.


``` ts
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Animal extends Vue {
  public static voice(): void {
    alert('Some voice');
  }
}

```

calling method of animal class

``` ts
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Animal from "components/Animal";
import { Todo, Meta } from './models';

@Component
export default class ClassComponent extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string;

  @Prop({ type: Array, default: () => [] }) readonly todos!: Todo[];

  @Prop({ type: Object, required: true }) readonly meta!: Meta;

  @Prop(Boolean) readonly active!: boolean;

  clickCount = 0;

   // here calling a method
  increment() {
    this.clickCount += 1;
    Animal.voice();
  }

  get todoCount() {
    return this.todos.length;
  }
}
</script>

```

Or we can simply extend a class, and call public method of superclass


``` ts
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Animal from "components/Animal";
import { Todo, Meta } from './models';

@Component
export default class ClassComponent extends Animal {

   // here calling a method of parent
  voice();
}
</script>

```

## Vuex with TS and class based components

Read [here](https://blog.logrocket.com/how-to-write-a-vue-js-app-completely-in-typescript/#5vuex)


