// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OwnershipPulled extends ethereum.Event {
  get params(): OwnershipPulled__Params {
    return new OwnershipPulled__Params(this);
  }
}

export class OwnershipPulled__Params {
  _event: OwnershipPulled;

  constructor(event: OwnershipPulled) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipPushed extends ethereum.Event {
  get params(): OwnershipPushed__Params {
    return new OwnershipPushed__Params(this);
  }
}

export class OwnershipPushed__Params {
  _event: OwnershipPushed;

  constructor(event: OwnershipPushed) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class GOhmPriceOracle__getRoundDataResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromSignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }
}

export class GOhmPriceOracle__latestRoundDataResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromSignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }
}

export class GOhmPriceOracle extends ethereum.SmartContract {
  static bind(address: Address): GOhmPriceOracle {
    return new GOhmPriceOracle("GOhmPriceOracle", address);
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  description(): string {
    let result = super.call("description", "description():(string)", []);

    return result[0].toString();
  }

  try_description(): ethereum.CallResult<string> {
    let result = super.tryCall("description", "description():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getPrice(): BigInt {
    let result = super.call("getPrice", "getPrice():(int256)", []);

    return result[0].toBigInt();
  }

  try_getPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getPrice", "getPrice():(int256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRoundData(_roundId: BigInt): GOhmPriceOracle__getRoundDataResult {
    let result = super.call(
      "getRoundData",
      "getRoundData(uint80):(uint80,int256,uint256,uint256,uint80)",
      [ethereum.Value.fromUnsignedBigInt(_roundId)]
    );

    return new GOhmPriceOracle__getRoundDataResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_getRoundData(
    _roundId: BigInt
  ): ethereum.CallResult<GOhmPriceOracle__getRoundDataResult> {
    let result = super.tryCall(
      "getRoundData",
      "getRoundData(uint80):(uint80,int256,uint256,uint256,uint80)",
      [ethereum.Value.fromUnsignedBigInt(_roundId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GOhmPriceOracle__getRoundDataResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  latestAnswer(): BigInt {
    let result = super.call("latestAnswer", "latestAnswer():(int256)", []);

    return result[0].toBigInt();
  }

  try_latestAnswer(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("latestAnswer", "latestAnswer():(int256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  latestRoundData(): GOhmPriceOracle__latestRoundDataResult {
    let result = super.call(
      "latestRoundData",
      "latestRoundData():(uint80,int256,uint256,uint256,uint80)",
      []
    );

    return new GOhmPriceOracle__latestRoundDataResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_latestRoundData(): ethereum.CallResult<
    GOhmPriceOracle__latestRoundDataResult
  > {
    let result = super.tryCall(
      "latestRoundData",
      "latestRoundData():(uint80,int256,uint256,uint256,uint80)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GOhmPriceOracle__latestRoundDataResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  policy(): Address {
    let result = super.call("policy", "policy():(address)", []);

    return result[0].toAddress();
  }

  try_policy(): ethereum.CallResult<Address> {
    let result = super.tryCall("policy", "policy():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  version(): BigInt {
    let result = super.call("version", "version():(uint256)", []);

    return result[0].toBigInt();
  }

  try_version(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("version", "version():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _ohmFeed(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _indexFeed(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class PullManagementCall extends ethereum.Call {
  get inputs(): PullManagementCall__Inputs {
    return new PullManagementCall__Inputs(this);
  }

  get outputs(): PullManagementCall__Outputs {
    return new PullManagementCall__Outputs(this);
  }
}

export class PullManagementCall__Inputs {
  _call: PullManagementCall;

  constructor(call: PullManagementCall) {
    this._call = call;
  }
}

export class PullManagementCall__Outputs {
  _call: PullManagementCall;

  constructor(call: PullManagementCall) {
    this._call = call;
  }
}

export class PushManagementCall extends ethereum.Call {
  get inputs(): PushManagementCall__Inputs {
    return new PushManagementCall__Inputs(this);
  }

  get outputs(): PushManagementCall__Outputs {
    return new PushManagementCall__Outputs(this);
  }
}

export class PushManagementCall__Inputs {
  _call: PushManagementCall;

  constructor(call: PushManagementCall) {
    this._call = call;
  }

  get newOwner_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class PushManagementCall__Outputs {
  _call: PushManagementCall;

  constructor(call: PushManagementCall) {
    this._call = call;
  }
}

export class RenounceManagementCall extends ethereum.Call {
  get inputs(): RenounceManagementCall__Inputs {
    return new RenounceManagementCall__Inputs(this);
  }

  get outputs(): RenounceManagementCall__Outputs {
    return new RenounceManagementCall__Outputs(this);
  }
}

export class RenounceManagementCall__Inputs {
  _call: RenounceManagementCall;

  constructor(call: RenounceManagementCall) {
    this._call = call;
  }
}

export class RenounceManagementCall__Outputs {
  _call: RenounceManagementCall;

  constructor(call: RenounceManagementCall) {
    this._call = call;
  }
}