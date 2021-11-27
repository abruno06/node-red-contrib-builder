# node-red-contrib-builder


This node allow to inject in an easy way a full and complex JSON msg to nodered flow


This node have a little code injection checking to prevent malicious usage injection
the data will be serialise and deserialise using JSON parsing 
msg._msgid will be regenerated

