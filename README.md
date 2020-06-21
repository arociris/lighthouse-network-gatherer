# lighthouse-network-gatherer

This tool is an addition to the wonderful list of gatherers by Google [LightHouse](https://github.com/GoogleChrome/lighthouse) tool by providing full network logs irrespective of request method used.

**Problem with Lighthouse**
This overcomes the limitation of Lighthouse tool as per which, one can only get the network requests which are of the method "GET". That means if you are to write a custom audit on certain network requests which are of POST or other types then it won't be possible.

**Improvement added by this tool**
This tool will provide you full list of network requests which originated from browser tab under auditing. That means now you will have access to full network logs irrespective of request method and can  now write your custom audits which were dependent on network logs



## Usage

 1. Install using npm as below:
`npm install lighthouse-network-gatherer`

2. Create your own custom gatherer which extends class `networkGatherer`. Below is the sample code.
```
class  NetworkLogs  extends  networkGatherer{
  constructor(){
    super()
  }
}
module.exports = NetworkLogs
```

3. Provide custom gatherer name in lighthouse config as specified in the [Lighthouse documentation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md)
4. You can now use the exported NetworkLogs as an artifect in the audit as below:
```
static  get  meta() {
	return {
		id:  'network-audit',
		title:  'Network analysis',
		failureTitle:  'Some custom failure',
		description:  'Testing network requests',
		requiredArtifacts: ['NetworkLogs'],
	};
}
```

That's it, you can now do all the manipulations with network requests in the audits.
