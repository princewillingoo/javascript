// Static properties and methods

class User {
    static staticMethod() {
        console.log(this === User)
    };
}

User.staticMethod(); // true

// That actually does the same as assigning it as a property directly:

// Usually, static methods are used to implement functions that belong to the 
// class as a whole, but not to any particular object of it.

class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date
    }

    static compare(articleA, articleB) {
        return articleA.date - articleB.date;
    }
}

// usage
let articles = [
    new Article("HTML", new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);

console.log( articles[0].title ); // CSS

// Let’s say, we need multiple ways to create an article:

//     Create by given parameters (title, date etc).
//     Create an empty article with today’s date.
//     …or else somehow.

class Article {
    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
  
    static createTodays() {
      // remember, this = Article
      return new this("Today's digest", new Date());
    }
}
  
let article = Article.createTodays();
  
console.log( article.title ); // Today's digest

// Static properties

class Article {
    static publisher = "Ilya Kantor";
}

// That is the same as a direct assignment to Article:

// Inheritance of static properties and methods

// Static properties and methods are inherited.