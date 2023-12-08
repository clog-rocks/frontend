# Changelog

## 1.0.0 (2023-12-08)


### Features

* add faster fade transition ([#815](https://github.com/clog-rocks/frontend/issues/815)) ([9e8f54c](https://github.com/clog-rocks/frontend/commit/9e8f54ce5382ecb084e222db5c15b7dd153cb2cf))
* add form validation ([#852](https://github.com/clog-rocks/frontend/issues/852)) ([c9170e8](https://github.com/clog-rocks/frontend/commit/c9170e889e3a9e40cb7e0009b50b5363121a4079))
* add forms ([#590](https://github.com/clog-rocks/frontend/issues/590)) ([925310e](https://github.com/clog-rocks/frontend/commit/925310e21d676cd568b2584f1ae9965447e555e0))
* lazy-load all routes ([#812](https://github.com/clog-rocks/frontend/issues/812)) ([41772fb](https://github.com/clog-rocks/frontend/commit/41772fb43b5df29185d287bf08afb9fcac3c0c36))
* **stores:** add tree getters ([#902](https://github.com/clog-rocks/frontend/issues/902)) ([3e8c97c](https://github.com/clog-rocks/frontend/commit/3e8c97cf6f2c6cc02dfe90724106e009b05ae385))


### Bug Fixes

* **forms:** use correct `label` ([#864](https://github.com/clog-rocks/frontend/issues/864)) ([6b3b1bb](https://github.com/clog-rocks/frontend/commit/6b3b1bbe808d5b6d4675e8d9b22e538986741659))

## 0.0.1 (2022-12-09)


### Features

* add bare auth vuex component ([ee5afab](https://github.com/clog-rocks/frontend/commit/ee5afab9ebd5626c082eabb23d92ec0bd625331d))
* add core's and logbook's store and service ([f297be0](https://github.com/clog-rocks/frontend/commit/f297be01df51a000275f081d72ac6d3d6247f8f4))
* add navbar and initial logbook components ([4e4da82](https://github.com/clog-rocks/frontend/commit/4e4da829d73c2e8b060a93b87900fe66fda6fe51))
* add thin-header style ([#65](https://github.com/clog-rocks/frontend/issues/65)) ([010d145](https://github.com/clog-rocks/frontend/commit/010d1452af8b9a07e468fb8564646b1cb84d8249))
* add Vuetify, Login and Register components ([6480479](https://github.com/clog-rocks/frontend/commit/64804797aea8761e42c6ac62b242664982a6a9d1))
* **api:** use axios instance ([#2](https://github.com/clog-rocks/frontend/issues/2)) ([e324d95](https://github.com/clog-rocks/frontend/commit/e324d954ebecc6045a88d097441c3915968b3a98))
* **auth:** add logout functionality ([22c3b48](https://github.com/clog-rocks/frontend/commit/22c3b48f1c6e307b22117753ff88b91dff548c96))
* **auth:** don't center container on small screens ([9f27612](https://github.com/clog-rocks/frontend/commit/9f27612c8f7a8e7f46c3091cc536c2957fba95eb))
* **auth:** query for already registered usernames ([6ac654b](https://github.com/clog-rocks/frontend/commit/6ac654b52af0401722488693ce49c5a3529694a6))
* center main container on mobile only ([e992d45](https://github.com/clog-rocks/frontend/commit/e992d45fadc3abe462a032f544dfb2cbfeb4e744))
* **ci:** configure dependabot ([#20](https://github.com/clog-rocks/frontend/issues/20)) ([6e145f5](https://github.com/clog-rocks/frontend/commit/6e145f59ae382e02bfb294e2cdde7e0e3b2d9092))
* **css:** add enargled text classes ([50e012b](https://github.com/clog-rocks/frontend/commit/50e012b1318eca5b043c5672b2c17005fba0a08f))
* **css:** use scss where justified ([#3](https://github.com/clog-rocks/frontend/issues/3)) ([2ff93fd](https://github.com/clog-rocks/frontend/commit/2ff93fdf0ea2849a7994d4f293109bbfef3d4e09))
* mammoth PR bringing unrelated changes ([#5](https://github.com/clog-rocks/frontend/issues/5)) ([9f0ed97](https://github.com/clog-rocks/frontend/commit/9f0ed97bf474c0f405900f4ebf4a34e86cceb2e4))
* **navbar:** some improvements ([#13](https://github.com/clog-rocks/frontend/issues/13)) ([436b9b7](https://github.com/clog-rocks/frontend/commit/436b9b7ca996f7df66b6c1240cc919d5aa14a745))
* remove icons from login/register forms ([#10](https://github.com/clog-rocks/frontend/issues/10)) ([f0a62db](https://github.com/clog-rocks/frontend/commit/f0a62db743e1bc664521341c2365ab217e6a682f))
* **router:** add catch-all rule ([48b5a07](https://github.com/clog-rocks/frontend/commit/48b5a07ba144ac65e1a0c541f07f5ac6e700bef8))
* **router:** add route guards ([7926e7b](https://github.com/clog-rocks/frontend/commit/7926e7b34b9e5d42c54b2f7da535e6db0acc804e))
* **router:** don't allowed unathenticated on Auth ([f8f7660](https://github.com/clog-rocks/frontend/commit/f8f7660c2033f46a017375ce1836f215874fa196))
* **router:** use history mode ([1405f08](https://github.com/clog-rocks/frontend/commit/1405f0879b4a81f5b29d29b47011c2acdfedfab9))
* **training:** add initial component ([ca9fd89](https://github.com/clog-rocks/frontend/commit/ca9fd89027a44630a19078213cd9d87d1823e670))
* **training:** add session functionality ([#37](https://github.com/clog-rocks/frontend/issues/37)) ([9f00abe](https://github.com/clog-rocks/frontend/commit/9f00abe33f0e77aba62698ab3059afdc05cc22b9))
* **training:** add tags functionality & general improvements to training form ([#86](https://github.com/clog-rocks/frontend/issues/86)) ([05dbb70](https://github.com/clog-rocks/frontend/commit/05dbb70f6044835de411795ae6508206c53855a6))
* **training:** validate new session form ([#82](https://github.com/clog-rocks/frontend/issues/82)) ([c02bb2e](https://github.com/clog-rocks/frontend/commit/c02bb2e26918e310d2fc3df4e2f78c04040c79cf))
* use axios.defaults for Authorization token ([d78db0e](https://github.com/clog-rocks/frontend/commit/d78db0ecd29c7e2e6c59515ff1619e3b7753db46))
* use JWT Token ([#90](https://github.com/clog-rocks/frontend/issues/90)) ([9b9a82b](https://github.com/clog-rocks/frontend/commit/9b9a82b43c8660d802eac6f07ac02ae749c412ca))


### Bug Fixes

* **auth:** add component switch height transition ([10894da](https://github.com/clog-rocks/frontend/commit/10894daa2b04c94d15d21b7f160532ed8a43fd96))
* **auth:** improve sizing and padding ([7b089dc](https://github.com/clog-rocks/frontend/commit/7b089dc4ae9ec61c3d87dd3cf1d1be3bdcb6fd00))
* **auth:** prevent default for auth forms ([1dacca8](https://github.com/clog-rocks/frontend/commit/1dacca823f6823f0c2cb9255c1ff5611b62b44c4))
* **auth:** properly watch for current route ([0e95d1e](https://github.com/clog-rocks/frontend/commit/0e95d1ebff6024f99929a01767c56ec377854f7e))
* **auth:** validate custom errors in forms ([f3d3340](https://github.com/clog-rocks/frontend/commit/f3d334062aa1c0436302e7192001521914a70f85))
* changes to Auth components ([6ba14e0](https://github.com/clog-rocks/frontend/commit/6ba14e0247c24403ffd0ec004b9b074644a6087d))
* fix detection of auth view ([6d29a5d](https://github.com/clog-rocks/frontend/commit/6d29a5d0e9d7d7c58ce461ddf5856c5929f4d57a))
* global Loading component registration ([#47](https://github.com/clog-rocks/frontend/issues/47)) ([36e9c7b](https://github.com/clog-rocks/frontend/commit/36e9c7bec05feff0ba59487ca05c73ac16b477fe))
* **navbar:** don't flicker on font-weight change ([65e26d4](https://github.com/clog-rocks/frontend/commit/65e26d47c1d672d7843386b614088af65c88fb1e))
* **navbar:** refactor and style improvement ([14ab475](https://github.com/clog-rocks/frontend/commit/14ab475568223f316edc91e143c438cce79901a3))
* retrieve cities for training ([b35feb0](https://github.com/clog-rocks/frontend/commit/b35feb03841b3aeee74f3035a4953dd3092406ca))
* **services:** conform to latest API ([#88](https://github.com/clog-rocks/frontend/issues/88)) ([7d57609](https://github.com/clog-rocks/frontend/commit/7d576092e8fc6e0eb81485f3a4f19f8e50886ca5))
* **services:** conform to latest API [#2](https://github.com/clog-rocks/frontend/issues/2) ([#89](https://github.com/clog-rocks/frontend/issues/89)) ([facc7e1](https://github.com/clog-rocks/frontend/commit/facc7e10a3a9005fc0b303c05457e1f39008341d))
* **stylelint:** add ignore configuration ([#59](https://github.com/clog-rocks/frontend/issues/59)) ([e90a926](https://github.com/clog-rocks/frontend/commit/e90a926c563c9ea67ac79e851ab1dd12723efe6c))
* update Auth view ([fbf44ac](https://github.com/clog-rocks/frontend/commit/fbf44ac3935a264a9d151da54244c6ddb2777342))
* various stylelint fixes ([#50](https://github.com/clog-rocks/frontend/issues/50)) ([a0ca0cd](https://github.com/clog-rocks/frontend/commit/a0ca0cdd02c0170d7eeeae03b5cbb79b997877df))
* **vuex:** call proper action ([14bc86e](https://github.com/clog-rocks/frontend/commit/14bc86e7c25c609c3606e5c7baccab3f6ea1a7ae))


### Continuous Integration

* update release-please workflow ([#120](https://github.com/clog-rocks/frontend/issues/120)) ([7a9fcbf](https://github.com/clog-rocks/frontend/commit/7a9fcbf3b05c3175261e90136becbb5873ebad05))

### 0.0.1 (2022-02-03)


### Features

* add bare auth vuex component ([ee5afab](https://github.com/clog-rocks/frontend/commit/ee5afab9ebd5626c082eabb23d92ec0bd625331d))
* add core's and logbook's store and service ([f297be0](https://github.com/clog-rocks/frontend/commit/f297be01df51a000275f081d72ac6d3d6247f8f4))
* add navbar and initial logbook components ([4e4da82](https://github.com/clog-rocks/frontend/commit/4e4da829d73c2e8b060a93b87900fe66fda6fe51))
* add thin-header style ([#65](https://github.com/clog-rocks/frontend/issues/65)) ([010d145](https://github.com/clog-rocks/frontend/commit/010d1452af8b9a07e468fb8564646b1cb84d8249))
* add Vuetify, Login and Register components ([6480479](https://github.com/clog-rocks/frontend/commit/64804797aea8761e42c6ac62b242664982a6a9d1))
* **api:** use axios instance ([#2](https://github.com/clog-rocks/frontend/issues/2)) ([e324d95](https://github.com/clog-rocks/frontend/commit/e324d954ebecc6045a88d097441c3915968b3a98))
* **auth:** add logout functionality ([22c3b48](https://github.com/clog-rocks/frontend/commit/22c3b48f1c6e307b22117753ff88b91dff548c96))
* **auth:** don't center container on small screens ([9f27612](https://github.com/clog-rocks/frontend/commit/9f27612c8f7a8e7f46c3091cc536c2957fba95eb))
* **auth:** query for already registered usernames ([6ac654b](https://github.com/clog-rocks/frontend/commit/6ac654b52af0401722488693ce49c5a3529694a6))
* center main container on mobile only ([e992d45](https://github.com/clog-rocks/frontend/commit/e992d45fadc3abe462a032f544dfb2cbfeb4e744))
* **ci:** configure dependabot ([#20](https://github.com/clog-rocks/frontend/issues/20)) ([6e145f5](https://github.com/clog-rocks/frontend/commit/6e145f59ae382e02bfb294e2cdde7e0e3b2d9092))
* **css:** add enargled text classes ([50e012b](https://github.com/clog-rocks/frontend/commit/50e012b1318eca5b043c5672b2c17005fba0a08f))
* **css:** use scss where justified ([#3](https://github.com/clog-rocks/frontend/issues/3)) ([2ff93fd](https://github.com/clog-rocks/frontend/commit/2ff93fdf0ea2849a7994d4f293109bbfef3d4e09))
* mammoth PR bringing unrelated changes ([#5](https://github.com/clog-rocks/frontend/issues/5)) ([9f0ed97](https://github.com/clog-rocks/frontend/commit/9f0ed97bf474c0f405900f4ebf4a34e86cceb2e4))
* **navbar:** some improvements ([#13](https://github.com/clog-rocks/frontend/issues/13)) ([436b9b7](https://github.com/clog-rocks/frontend/commit/436b9b7ca996f7df66b6c1240cc919d5aa14a745))
* remove icons from login/register forms ([#10](https://github.com/clog-rocks/frontend/issues/10)) ([f0a62db](https://github.com/clog-rocks/frontend/commit/f0a62db743e1bc664521341c2365ab217e6a682f))
* **router:** add catch-all rule ([48b5a07](https://github.com/clog-rocks/frontend/commit/48b5a07ba144ac65e1a0c541f07f5ac6e700bef8))
* **router:** add route guards ([7926e7b](https://github.com/clog-rocks/frontend/commit/7926e7b34b9e5d42c54b2f7da535e6db0acc804e))
* **router:** don't allowed unathenticated on Auth ([f8f7660](https://github.com/clog-rocks/frontend/commit/f8f7660c2033f46a017375ce1836f215874fa196))
* **router:** use history mode ([1405f08](https://github.com/clog-rocks/frontend/commit/1405f0879b4a81f5b29d29b47011c2acdfedfab9))
* **training:** add initial component ([ca9fd89](https://github.com/clog-rocks/frontend/commit/ca9fd89027a44630a19078213cd9d87d1823e670))
* **training:** add session functionality ([#37](https://github.com/clog-rocks/frontend/issues/37)) ([9f00abe](https://github.com/clog-rocks/frontend/commit/9f00abe33f0e77aba62698ab3059afdc05cc22b9))
* **training:** add tags functionality & general improvements to training form ([#86](https://github.com/clog-rocks/frontend/issues/86)) ([05dbb70](https://github.com/clog-rocks/frontend/commit/05dbb70f6044835de411795ae6508206c53855a6))
* **training:** validate new session form ([#82](https://github.com/clog-rocks/frontend/issues/82)) ([c02bb2e](https://github.com/clog-rocks/frontend/commit/c02bb2e26918e310d2fc3df4e2f78c04040c79cf))
* use axios.defaults for Authorization token ([d78db0e](https://github.com/clog-rocks/frontend/commit/d78db0ecd29c7e2e6c59515ff1619e3b7753db46))
* use JWT Token ([#90](https://github.com/clog-rocks/frontend/issues/90)) ([9b9a82b](https://github.com/clog-rocks/frontend/commit/9b9a82b43c8660d802eac6f07ac02ae749c412ca))


### Bug Fixes

* **auth:** add component switch height transition ([10894da](https://github.com/clog-rocks/frontend/commit/10894daa2b04c94d15d21b7f160532ed8a43fd96))
* **auth:** improve sizing and padding ([7b089dc](https://github.com/clog-rocks/frontend/commit/7b089dc4ae9ec61c3d87dd3cf1d1be3bdcb6fd00))
* **auth:** prevent default for auth forms ([1dacca8](https://github.com/clog-rocks/frontend/commit/1dacca823f6823f0c2cb9255c1ff5611b62b44c4))
* **auth:** properly watch for current route ([0e95d1e](https://github.com/clog-rocks/frontend/commit/0e95d1ebff6024f99929a01767c56ec377854f7e))
* **auth:** validate custom errors in forms ([f3d3340](https://github.com/clog-rocks/frontend/commit/f3d334062aa1c0436302e7192001521914a70f85))
* changes to Auth components ([6ba14e0](https://github.com/clog-rocks/frontend/commit/6ba14e0247c24403ffd0ec004b9b074644a6087d))
* fix detection of auth view ([6d29a5d](https://github.com/clog-rocks/frontend/commit/6d29a5d0e9d7d7c58ce461ddf5856c5929f4d57a))
* global Loading component registration ([#47](https://github.com/clog-rocks/frontend/issues/47)) ([36e9c7b](https://github.com/clog-rocks/frontend/commit/36e9c7bec05feff0ba59487ca05c73ac16b477fe))
* **navbar:** don't flicker on font-weight change ([65e26d4](https://github.com/clog-rocks/frontend/commit/65e26d47c1d672d7843386b614088af65c88fb1e))
* **navbar:** refactor and style improvement ([14ab475](https://github.com/clog-rocks/frontend/commit/14ab475568223f316edc91e143c438cce79901a3))
* retrieve cities for training ([b35feb0](https://github.com/clog-rocks/frontend/commit/b35feb03841b3aeee74f3035a4953dd3092406ca))
* **services:** conform to latest API ([#88](https://github.com/clog-rocks/frontend/issues/88)) ([7d57609](https://github.com/clog-rocks/frontend/commit/7d576092e8fc6e0eb81485f3a4f19f8e50886ca5))
* **services:** conform to latest API [#2](https://github.com/clog-rocks/frontend/issues/2) ([#89](https://github.com/clog-rocks/frontend/issues/89)) ([facc7e1](https://github.com/clog-rocks/frontend/commit/facc7e10a3a9005fc0b303c05457e1f39008341d))
* **stylelint:** add ignore configuration ([#59](https://github.com/clog-rocks/frontend/issues/59)) ([e90a926](https://github.com/clog-rocks/frontend/commit/e90a926c563c9ea67ac79e851ab1dd12723efe6c))
* update Auth view ([fbf44ac](https://github.com/clog-rocks/frontend/commit/fbf44ac3935a264a9d151da54244c6ddb2777342))
* various stylelint fixes ([#50](https://github.com/clog-rocks/frontend/issues/50)) ([a0ca0cd](https://github.com/clog-rocks/frontend/commit/a0ca0cdd02c0170d7eeeae03b5cbb79b997877df))
* **vuex:** call proper action ([14bc86e](https://github.com/clog-rocks/frontend/commit/14bc86e7c25c609c3606e5c7baccab3f6ea1a7ae))


### Continuous Integration

* update release-please workflow ([#120](https://github.com/clog-rocks/frontend/issues/120)) ([7a9fcbf](https://github.com/clog-rocks/frontend/commit/7a9fcbf3b05c3175261e90136becbb5873ebad05))
