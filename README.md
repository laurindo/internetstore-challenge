# Challenge Internet Stores [NodeJS]

[![N|Solid](https://travis-ci.org/laurindo/internetstore-challenge.svg?branch=master)](https://travis-ci.org/laurindo/internetstore-challenge.svg?branch=master)

Challenge to read a bunch of files .json or .yaml and show the correct format.

### Installation

It requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies and start the server.

**Test Case 01**
```sh
$ npm install
$ node index -cn checkout -ex json
$ node index -cn checkout -ex yaml
```

**Output case 01**
```sh  
{  
    ${siteId1}:{  
        ${environment1}: {
            … data
        },
        ${environment2}: {
            … data
        }
    },
    ${siteId2}: {
        ${environment}: {
        },
        ${environment2}: {
            … data
        }
    }
}
```

**Test Case 02**
```sh
$ npm install
$ node index -cn checkout -si anpl -cm {\"only_env\":\"true\"} -ex json
$ node index -cn checkout -si anpl -cm {\"only_env\":\"true\"} -ex yaml
```

**Output Case 02**
```sh
{  
    ${environment1}: {
        … data
    },
    ${environment2}: {
        … data
    }
}
```

**Test Case 03**
```sh
$ npm install
$ node index -cn checkout -si anpl -ex json
$ node index -cn checkout -si anpl -ex yaml
```

**Output Case 03**
```sh
{  
    ... data
}
```

#### [Commands]
**-cn configName:**     represent the file's name
(checkout/config/forms_customer)

**-si siteId:**         represent site name             
bkbe/anpl/bkit

**-ev environment:**    represent environment name      
production/staging/development

**-ex extension:**      represent file extension        
yaml/json

**-cm commands:**       I can pass extra commands       
{\"only_env\":\"true\"}

### Developer

Daniel Laurindo
