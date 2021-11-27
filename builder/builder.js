module.exports = function (RED) {
    "use strict";
    //const clone = require("clone");

    function BuilderNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        node.data = n.data;

        node.on("input", function (msg, send, done) {

            let data = node.data || "{}";
            //  console.log("Node Data:"+JSON.stringify(data))
            //  console.log(node);
            try {
                data = JSON.parse(data)
                if (Array.isArray(data)) {
                    msg = {
                        "payload": data
                    }
                } else {
                    msg = JSON.parse(JSON.stringify(data)); //we never know how people can inject bad stuff
                    delete msg["_msgid"]; // delete in case it exist
                }
                send(msg);

            } catch (e) {
                send(e);

            }
            done()

        })
    }
    RED.nodes.registerType("builder", BuilderNode);
    RED.httpAdmin.get("/inject/:id", RED.auth.needsPermission("inject.write"), function (req, res) {
        var node = RED.nodes.getNode(req.params.id);
        if (node != null) {
            try {
                node.receive();
                res.sendStatus(200);
            } catch (err) {
                res.sendStatus(500);
                node.error(RED._("inject.failed", {
                    error: err.toString()
                }));
            }
        } else {
            res.sendStatus(404);
        }
    });
};