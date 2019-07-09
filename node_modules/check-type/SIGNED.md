##### Signed by https://keybase.io/alistairjcbrown
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.14 (GNU/Linux)

iQEcBAABAgAGBQJTrf3aAAoJEJEOHi8Q7zzz8kQH/2gXnnQkot6AFcQEptSLcYER
xruAOARBju7JZ1X9WyV0c5m9nWCc8h1KM9Ziw6RhmVkfUr4OY2e9K19nQcvc38Ms
diRD17CJTDeQQcBueraCl4qzFIzYPRRM10UkBaQruQptbGtjuNZYGw0TkvqpxCpJ
VI4hIjMqvtFh0mJ/Sq1/ZMC5oqAKJwvHMkgacmJB4wDd6JKz59s5oyk96z4WEcPd
WUPjR985goiSbic5Q6ELy3/ZDs7FXqEt0XB4ZAeubai7F8yH9QANFrXAEdyPipS0
GnXEOXECOlzmgs38TuAEI9m5LsWvDbAo6Kkxm4jb7HEcp2ozNZZt1O5b8m6qD2s=
=/Tb8
-----END PGP SIGNATURE-----

```

<!-- END SIGNATURES -->

### Begin signed statement 

#### Expect

```
size   exec  file                                  contents                                                        
             ./                                                                                                    
50             .gitignore                          15518c53e314172f50549b4a29fde9086008f784effc1a2e65b38f09fb1a1403
156            .travis.yml                         2a87273f7b9ada9912539b7bf585aa135c065d5042a64077d9cff9194e9060d8
6094   x       Gruntfile.js                        40251e29e1449b82e4a5af5dd37fe80e553a544980323192425d6e48dc0fdffa
1080           LICENSE                             cfec6a6c39832bb228b8f4622aefb14f08d3c0f02823238c7143c668c3acd898
9120           README.md                           5d6eb26cf43165f6a24259d324320ab8ca3e779ff15d95a566c0860b15813789
795            bower.json                          a1a687ac924ee6e68e9aca436ebb4183aea7592dd32768104b8a7e8948f0e18b
1403           check-type.min.js                   9375dbf852402ff113b784dd363ed49a8f035e1104e7f3b8f3b2b5dfaa494b1f
586            component.json                      cbc0ae53f3abdc841789fe0d7bfa3694618e1715eaff06dff81cdc4e699aeb53
               lib/                                                                                                
6687             check-type.js                     eb4217c6a5116d024b43248b2fd679ff973eb8272ec827c274a6ec81c4b0ba84
                 examples/                                                                                         
                   browser/                                                                                        
678                  app.js                        28309b9285a84efb6eb52e2bb664e04abcb6afa0f6ac12e26d42b765ea505d67
266                  bower.json                    6387e55105b163c0c2e2a60d854ede62f2f57c21eccff637faa8dcc8d5e9b840
669                  index.html                    823717c6c8312f2c9353a7aa2a1fe1da8fa544dc0e445688fdfd35f07401a632
                   nodejs/                                                                                         
262                  app.js                        c499853e75d24fb156e39312063067b985ac18a7c97d3f927de727c3827bf19f
256                  package.json                  f97cdb867a0e853a9b6c1aa0c6e0be0ed1b660d1c0d2ba137cb5113ab04060e8
                   requirejs/                                                                                      
                     browser/                                                                                      
767                    app.js                      1a28dfe5b2928b64346cb7d1da863bef614e8d22ae0bb6007edc98319f78b96e
314                    bower.json                  8bab89521cee02384c16af8943c3fb7a4763c1c6d37a5083e2e6ccc098118d94
821                    index.html                  8762f6453ba7d16da94ca6c32b2ee5456a76fdae822635a46728d5ec2aec89ce
                     nodejs/                                                                                       
468                    app.js                      bedbfea8b04db7526ac28c39f4a12b9d1737dd2eff9a9ba400569eed7c2414bf
307                    package.json                a1ce41dca36d01b12b8cd4dc9b050a0b0775d45f2bd5abfcee43d87d0a20aecf
                 tests/                                                                                            
1497               check-type.test.html            fb9f189c429c186c04aa96e2b756b75f6440c5866f42e443e544fb97ebff28cc
13588  x           check-type.test.js              22ff4e7fa33c4afe50bca129589cf9080602d2e4a582f0e2a8d62c5a162751ec
                   fixtures/                                                                                       
325                  has_attribute_fixture.js      b75e70ef3d253e230c176b193ea44f8eac06ffe41f788b93243fe3fb6fa503f0
408                  has_property_fixture.js       fd07814084af0eff5535b2d1410f40949cbdf8f411464904a39d36d19dc31e27
267                  matches_structure_fixture.js  181053a1ce4d5b3947b7a18008313a815e9deeae9e05a5a31dce106bae788e10
1158           package.json                        695b9ca3eddfcfd52ad99981d6269c5a75e3377602f14d6d46536ab750dbbc5a
```

#### Ignore

```
/SIGNED.md
```

#### Presets

```
git      # ignore .git and anything as described by .gitignore files
dropbox  # ignore .dropbox-cache and other Dropbox-related files    
kb       # ignore anything as described by .kbignore files          
```

<!-- summarize version = 0.0.9 -->

### End signed statement

<hr>

#### Notes

With keybase you can sign any directory's contents, whether it's a git repo,
source code distribution, or a personal documents folder. It aims to replace the drudgery of:

  1. comparing a zipped file to a detached statement
  2. downloading a public key
  3. confirming it is in fact the author's by reviewing public statements they've made, using it

All in one simple command:

```bash
keybase dir verify
```

There are lots of options, including assertions for automating your checks.

For more info, check out https://keybase.io/docs/command_line/code_signing