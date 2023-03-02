# freshStorage
A fresh take on what localStorage should be.

## Introduction
freshStorage provides a way to persist data and ensure it doesn't go stale. Built on top of localStorage, every value is stored with an expiration date. Expired data is thrown away and you can trust the variables are fresh. 

## Install and Import

To install the freshStorage library into your project, use your favorite package manager.

For npm:
```sh
npm install freshstorage
```
or yarn:
```sh
yarn add freshstorage
```

Within a module you can bring in the freshStorage instance using a typical import statement. This will give the singleton instance of this class. 
```javascript
import freshStorage from 'freshstorage'
```

Any items stored in freshStorage are stored within localStorage. This makes items globally stored. Any item stored in one module will be accessible in any other module or any script inside the same domain.

## Usages
freshStorage has the same two primary functions as localStorage:
1. setItem
2. getItem

freshStorage is used similarly to localStorage. A key should be used to store an item and that same key would be used to retrieve that item from. The biggest difference is that when the item is stored an expiration is set for how long that item will be stored and valid (fresh). 

```javascript
   freshStorage.setItem(key, item, expiration);
   
   freshStorage.getItem(key);
```

### Parameters
**key** - This should always be a defined, non-null, non-empty string. This is used in both the `setItem` and `getItem`.

**item** - An item can be a boolean, number, string, Date, array or object. Unlike localStorage there is no need to use JSON.stringify or JSON.parse for anything other than a string. The stringify and parsing will happen for you.

**expiration** - The expiration is how long the item is valid. Often data is valid for a specific time. This expiration time can be in mulple formats. this can be a Date object, number of milliseconds since epoch time, or a shorthand relative date string. The relative date string is in the format of a 1-9 digit number followed by a character code. For more information about relative date strings you can see our docs, the examples below and the relative date codes table below.

More details about how the key or item is stored or working with expirations, can be found in our documentation.

## Examples

**Simple Fresh Example:**
```javascript
import freshStorage from 'freshstorage'

freshStorage.setItem('protein', 'carnitas', '15m');

const protein = freshStorage.getItem('protein'); // returns 'carnitas'
```
In this example, a string with value `carnitas` is stored under the key `protein` for 15 minutes using a shorthand relative date string. Then the item is retrieved within the expiration time using that same key. 

Any item retrieved before the expiration is considered `fresh` and will be retrieved.

**Example 2:**\
Storing an array using milliseconds:
```javascript
const veggies = ['lettuce', 'tomato', 'jalapeno'];

freshStorage.setItem('vegetables', veggies, 1852621203400);
```
This time a more complex object, an `array` of `veggies`, is stored until the date `15 September 2028 (GMT)` using a method of milliseconds since epoch time. If the item is retrieved before the expiration date, the item is considered fresh and the fresh vegetable array is returned.

**Example 3:**\
Stale item is not returned:
```javascript
const burrito = {
 protein: 'pollo asado',
 veg: ['onion', 'tomato'],
 heatRating: 3,
};

freshStorage.setItem('entree', burrito, '3s');

setTimeout(() => {
    freshStorage.getItem('entree'); // returns null
}, 5000);
```
The `burrito` object was stored for 3 seconds under the key `entree`. An attempt to retrieve the burrito happened 5 seconds later. Because the expiration has lapsed, the item is considered `stale`. Stale items are not retrieved. `null` will be returned whenever an item is stale or non-existent. The automatic garbage collector will eventually remove all stale items from storage. See docs for more info. 


## Resources

### Relative Date Codes
| code | description            | examples |
|------|------------------------|----------|
| ms   | number of milliseconds | '100ms'  |
| s    | number of seconds      | '20s'    |
| m    | number of minutes      | '15m'    |
| h    | number of hours        | '3h'     |
| d    | number of days         | '4d'     |
| w    | number of weeks        | '10w'    |
| M    | number of months       | '6M'     |
| y    | number of years        | '2y'     |
