'use strict';

const {Gatherer} = require('lighthouse');
const CDP = require('chrome-remote-interface');

/** Network captutr class*/
class captureNetwork extends Gatherer {
  constructor(){
    super()
    this._networkRequests=[]
    this.__networkRequestsAdded = this.onNetworkRequest.bind(this);
    this.client = undefined
  }


  /**
   * @param {LH.Crdp.Log.EntryAddedEvent} entry
   */
  onNetworkRequest(entry) {
    this._networkRequests.push(entry);
  }


  /**   * 
   * @param {*} options 
   */
  async beforePass(options) {
        const driver = options.driver;
        const cdp_options = {
          host: driver._connection.hostname,
          port: driver._connection.port
        };
      this.client = await CDP(cdp_options);
      const {Network, Page} = this.client;
      Network.requestWillBeSent(this.__networkRequestsAdded);
      await Network.enable();
      await Page.enable();              
  }

  /**   * 
   * @param {*} passContext 
   */
  async afterPass(passContext) {
      console.log("=========== You reached in after pass ================");
      const driver = passContext.driver
      const cdp_options = {
        host: driver._connection.hostname,
        port: driver._connection.port
      };

        this.client = await CDP(cdp_options);
        this.client.close()
        return this._networkRequests
  }
}

module.exports = captureNetwork;
