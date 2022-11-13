module.exports = function (RED) {
    "use strict";
     function BuilderNode(n) {
        RED.nodes.createNode(this, n);
        let node = this;

        node.data = n.data;

        node.on("input", function (msg, send, done) {
            let data = node.data || "{}";
            let rmsg ={}
            try {
                data = JSON.parse(data)
                if (Array.isArray(data)) {
                    rmsg = {"payload": data}
                } else {
                    rmsg = JSON.parse(JSON.stringify(data)); //we never know how people can inject bad stuff
                    delete rmsg["_msgid"]; // delete in case it exist
                }
                send(rmsg);
            } catch (e) {
                send(e);
            }
            done()
        })
    }
    //most like the inject one except get rather than post
    RED.nodes.registerType("builder", BuilderNode);
    RED.httpAdmin.get("/inject/:id", RED.auth.needsPermission("inject.write"), function (req, res) {
        let node = RED.nodes.getNode(req.params.id);
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