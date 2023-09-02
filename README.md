![](https://img.shields.io/badge/turbomonorepo-blue) ![](https://img.shields.io/badge/pnpm-green) 

# In-browser signature aggregation with Nova

There are two accompanying write-ups to this project. The [first one](https://hackmd.io/KxG-BH1nQPGpdRxz6M50hw) targets developers interested in developing an app using nova and nova-scotia. The [second one](https://hackmd.io/mArMuUx5TC2LEcYecc741Q?view) is a tad more technical, it features how we implement the secp/secq cycle in nova along with some benchmarks.

This is a monorepo demonstrating a working secp256k1 signature aggregation circuit using Nova. This work aims to show:

1. How to leverage nova for zk/snark app developers. Since it features a rust codebase, we can easily port folding circuits to `wasm` and get in-browser functionality. 

2. Demonstrate the relevancy of Nova in terms of performances. We compiled some benchmarks [here](https://hackmd.io/mArMuUx5TC2LEcYecc741Q#Benchmark). According to our estimates, this demo web app proving time for 300 secp signatures should oscillate from 2 to 6 signatures per second in the browser.

# How to run

You can run this app locally:

```sh
$ git clone git@github.com:dmpierre/nova-browser-ecdsa.git
$ cd nova-browser-ecdsa/
$ pnpm i && pnpm dev
```

Navigate to [localhost](http://localhost:3000/) and you should see the app running.