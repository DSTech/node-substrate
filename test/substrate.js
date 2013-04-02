var should = require("should");
var substrate = require('..')
describe('substrate',function(){
	it('should allow wildcards',function(){
		var res = substrate({"2":true,"six":6},{'*':true});
		res.should.have.ownProperty("2",true)
		res.should.have.ownProperty("six",6);
	});
	it('should filter attributes',function(){
		var res = substrate({"2":true,"six":6},{"six":true});
		res.should.not.have.ownProperty("2");
		res.should.have.ownProperty("six",6);
	});

	var testObj = {
		"2":true,
		"obj":{
			"3":false,
			"arr":[2,4,"six"]
		},
		"six":6
	};
	
	it('should filter unmarked objects',function(){
		var res = substrate(
			testObj,
			{
				"obj":true
			}
		);
		//obj in testObj is an object, but did not use an object specifier
		res.should.not.have.ownProperty("obj");
	});
	it('should allow marked objects',function(){
		var res = substrate(
			testObj,
			{
				"obj":{}
			}
		);
		res.should.have.ownProperty("obj");
		var obj = res.obj;
		obj.should.not.have.ownProperty("3");
		obj.should.not.have.ownProperty("arr");
	});
	it('should recurse',function(){
		var res = substrate(
			testObj,
			{
				"obj":{
					'*':true
				}
			}
		);
		res.should.have.ownProperty("obj");
		var obj = res.obj;
		obj.should.have.ownProperty("3",false);
		obj.should.have.ownProperty("arr").with.lengthOf(3);
	});
});
