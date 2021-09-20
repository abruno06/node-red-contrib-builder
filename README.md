# node-red-contrib-breaker


This node offer some kind of isolation between input and output to make sure change on msg.payload did not get reflected on attributes that could have been copy to payload. 
This is from a propose idea of @thechane .  
Switch to lodash.clonedeep


This node have the following impact in msg.payload, due to Side effect of JSON.stringify and parsing:
- undefined value will be remove
- NaN and Infinity will be nullify
- Date will become string
- Function will be lost


So make sure msg.payload only contain values.
