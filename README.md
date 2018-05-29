### Challenge Internet Stores [NodeJS]

* Installation
``npm install``

* Test
``npm run test``

* node version
``8.9.4``

#### Documentation

``[HELP]
    -cn configName:     represent the file's name               (checkout/config/forms_customer)
    -si siteId:         represent site name                     (bkbe/anpl/bkit)
    -ev environment:    represent environment name              (production/staging/development)
    -ex extension:      represent file extension                (yaml/json)``

#### Developer

Daniel Laurindo

#### Requirements

We have a bunch of config files in YAML or JSON formats, we need a function to read them in the form:

`getConfig(configName, siteId, environment) {}`

config could have following names:

- `${configName}.${extension}`
- `${configName}_${siteId}.${extension}`

If `siteId` is not included in the name then this file concerning all sites. Both of them should be read and merged to get proper configuration.

Each file has the following structure:

``{
    ${siteId1}: {
        ${environment1}: {
            … data
        },
        ${environment2}: {
            … data
        }
    },
    ${siteId2}: {
        ${environment}: {
        }
    }
}``

Environments: `production`, `staging`, `development`. `production` environment is used as defaults. If the key is not overridden in the required environment, key from production should be taken.

SiteIds: usually 3-6 letter identifier (or `default` for defaults).

Any level could be excluded, thus there can be: 

``{
    ${environment1}: {
        … data
    },
    ${environment2}: {
        … data
    }
}``

with configuration for all sites (or just one if it is `${configName}_${siteId}.${extension}` file).

Or just: 

``{
    …data
}``

For all sites and environments.

#### Use Cases

* Case 01
``{
    ${siteId1}: {
        ${environment1}: {
            … data
        },
        ${environment2}: {
            … data
        }
    },
    ${siteId2}: {
        ${environment}: {
        }
    }
}``

* Case 02
``{
    ${environment1}: {
        … data
    },
    ${environment2}: {
        … data
    }
}``

* Case 03
``{
    ... data
}``

