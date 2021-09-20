module.exports = function (RED) {
    "use strict";
    //const clone = require("clone");
    const clonedeep = require("lodash.clonedeep")


    function BreakerNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;



        this.on('input', (msg, send, done) => {

           // let m = clone(msg);
           let m = clonedeep(msg);
            const req = msg.req;
            const res = msg.res;
            delete msg.req;
            delete msg.res;
            if (msg.payload) {
                m.payload = JSON.parse(JSON.stringify(msg.payload))
            }
            if (req) {
                m.req = req;
            }
            if (res) {
                m.res = res;
            }
            send(m);
            done()

            //      console.log(typeof msg !== "undefined")

            // code below generate issue and it did not isolate correctly
            /*            //From RED.node.cloneMessage inspiration
                        if (typeof msg !== "undefined" && msg !== null) {

                            const req = msg.req;
                            const res = msg.res;
                            delete msg.req;
                            delete msg.res;

                            let m = clone(msg);

                            if (req) {
                                m.req = req;
                            }
                            if (res) {
                                m.res = res;
                            }
                            //make sure the payload is fully rebuild to remove any link
                            if (msg.payload) {
                                m.payload = JSON.parse(JSON.stringify(msg.payload))
                            }
                            send(m);
                            done()

                        }
                       
                        send(msg);
                        done()
            */
        });

    }
    RED.nodes.registerType("breaker", BreakerNode);
};