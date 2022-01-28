import { Address, BigDecimal, BigInt, log} from '@graphprotocol/graph-ts'
import { OHMDAIBondV4 } from '../../generated/OHMDAIBondV4/OHMDAIBondV4';
import { DAIBondV3 } from '../../generated/DAIBondV3/DAIBondV3';
import { ETHBondV1 } from '../../generated/ETHBondV1/ETHBondV1';

import { BondDiscount, Transaction } from '../../generated/schema'
import { DAIBOND_CONTRACTS3, DAIBOND_CONTRACTS3_BLOCK, ETHBOND_CONTRACT1, ETHBOND_CONTRACT1_BLOCK, FBEETSBOND_CONTRACT, FBEETSBOND_CONTRACT_BLOCK, GOHMBOND_CONTRACT, GOHMBOND_CONTRACT_BLOCK, MONOLITHBONDV2_CONTRACT, MONOLITHBONDV2_CONTRACT_BLOCK, MONOLITHBOND_CONTRACT, MONOLITHBOND_CONTRACT_BLOCK, OHMDAISLPBOND_CONTRACT4, OHMDAISLPBOND_CONTRACT4_BLOCK, } from './Constants';
import { hourFromTimestamp } from './Dates';
import { toDecimal } from './Decimals';
import { getOHMUSDRate } from './Price';
import { MonolithBond } from '../../generated/OlympusStakingV2/MonolithBond';
import { GOhmBond } from '../../generated/GOhmBond/GOhmBond';
import { FBeetsBond } from '../../generated/OlympusStakingV2/FBeetsBond';

export function loadOrCreateBondDiscount(timestamp: BigInt): BondDiscount{
    let hourTimestamp = hourFromTimestamp(timestamp);

    let bondDiscount = BondDiscount.load(hourTimestamp)
    if (bondDiscount == null) {
        bondDiscount = new BondDiscount(hourTimestamp)
        bondDiscount.timestamp = timestamp
        bondDiscount.dai_discount  = BigDecimal.fromString("0")
        bondDiscount.ohmdai_discount = BigDecimal.fromString("0")
        bondDiscount.eth_discount = BigDecimal.fromString("0")
        bondDiscount.save()
    }
    return bondDiscount as BondDiscount
}

export function updateBondDiscounts(transaction: Transaction): void{
    let bd = loadOrCreateBondDiscount(transaction.timestamp);
    let ohmRate = getOHMUSDRate();

    //OHMDAI
    if(transaction.blockNumber.gt(BigInt.fromString(OHMDAISLPBOND_CONTRACT4_BLOCK))){
        let bond = OHMDAIBondV4.bind(Address.fromString(OHMDAISLPBOND_CONTRACT4))
        let price_call = bond.try_bondPriceInUSD()
        if(price_call.reverted===false && price_call.value.gt(BigInt.fromI32(0))){
            bd.ohmdai_discount = ohmRate.div(toDecimal(price_call.value, 18))
            bd.ohmdai_discount = bd.ohmdai_discount.minus(BigDecimal.fromString("1"))
            bd.ohmdai_discount = bd.ohmdai_discount.times(BigDecimal.fromString("100"))
            log.debug("OHMDAI Discount OHM price {}  Bond Price {}  Discount {}", [ohmRate.toString(), price_call.value.toString(), bd.ohmdai_discount.toString()])
        }
        let stdDebtRatioCall = bond.try_standardizedDebtRatio()
        if(!stdDebtRatioCall.reverted) {
            bd.ohmdai_debt_ratio = stdDebtRatioCall.value;
        }
    }

    //DAI
    if(transaction.blockNumber.gt(BigInt.fromString(DAIBOND_CONTRACTS3_BLOCK))){
        let bond = DAIBondV3.bind(Address.fromString(DAIBOND_CONTRACTS3))
        let price_call = bond.try_bondPriceInUSD()
        if(price_call.reverted===false && price_call.value.gt(BigInt.fromI32(0))){
            bd.dai_discount = ohmRate.div(toDecimal(price_call.value, 18))
            bd.dai_discount = bd.dai_discount.minus(BigDecimal.fromString("1"))
            bd.dai_discount = bd.dai_discount.times(BigDecimal.fromString("100"))
            log.debug("DAI Discount OHM price {}  Bond Price {}  Discount {}", [ohmRate.toString(), price_call.value.toString(), bd.dai_discount.toString()])
        }
        let stdDebtRatioCall = bond.try_standardizedDebtRatio()
        if(!stdDebtRatioCall.reverted) {
            bd.dai_debt_ratio = stdDebtRatioCall.value;
        }
    }

    //ETH
    if(transaction.blockNumber.gt(BigInt.fromString(ETHBOND_CONTRACT1_BLOCK))){
        let bond = ETHBondV1.bind(Address.fromString(ETHBOND_CONTRACT1))
        let price_call = bond.try_bondPriceInUSD()
        if(price_call.reverted===false && price_call.value.gt(BigInt.fromI32(0))){
            bd.eth_discount = ohmRate.div(toDecimal(price_call.value, 18))
            bd.eth_discount = bd.eth_discount.minus(BigDecimal.fromString("1"))
            bd.eth_discount = bd.eth_discount.times(BigDecimal.fromString("100"))
            log.debug("ETH Discount OHM price {}  Bond Price {}  Discount {}", [ohmRate.toString(), price_call.value.toString(), bd.eth_discount.toString()])
        }
        let stdDebtRatioCall = bond.try_standardizedDebtRatio()
        if(!stdDebtRatioCall.reverted) {
            bd.eth_debt_ratio = stdDebtRatioCall.value;
        }
    }

    //MONOLITH
    if(transaction.blockNumber.gt(BigInt.fromString(MONOLITHBOND_CONTRACT_BLOCK))){
        let bond = MonolithBond.bind(Address.fromString(MONOLITHBOND_CONTRACT))
        let price_call = bond.try_bondPriceInUSD()
        if(price_call.reverted===false && price_call.value.gt(BigInt.fromI32(0))){
            bd.monolith_discount = ohmRate.div(toDecimal(price_call.value, 18)).minus(BigDecimal.fromString("1")).times(BigDecimal.fromString("100"))
        }
        let stdDebtRatioCall = bond.try_standardizedDebtRatio()
        if(!stdDebtRatioCall.reverted) {
            bd.monolith_debt_ratio = stdDebtRatioCall.value;
        }
    }

    //GOHM
    if (transaction.blockNumber.gt(BigInt.fromString(GOHMBOND_CONTRACT_BLOCK))){
        let bond = GOhmBond.bind(Address.fromString(GOHMBOND_CONTRACT))
        let price_call = bond.try_bondPriceInUSD()
        if(price_call.reverted===false && price_call.value.gt(BigInt.fromI32(0))){
            bd.gOhm_discount = ohmRate.div(toDecimal(price_call.value, 18)).minus(BigDecimal.fromString("1")).times(BigDecimal.fromString("100"))
        }
        let stdDebtRatioCall = bond.try_standardizedDebtRatio()
        if(!stdDebtRatioCall.reverted) {
            bd.gOhm_debt_ratio = stdDebtRatioCall.value;
        }
    }

    //MONOLITHV2
    if(transaction.blockNumber.gt(BigInt.fromString(MONOLITHBONDV2_CONTRACT_BLOCK))){
        let bond = MonolithBond.bind(Address.fromString(MONOLITHBONDV2_CONTRACT))
        let price_call = bond.try_bondPriceInUSD()
        if(price_call.reverted===false && price_call.value.gt(BigInt.fromI32(0))){
            bd.monolithV2_discount = ohmRate.div(toDecimal(price_call.value, 18)).minus(BigDecimal.fromString("1")).times(BigDecimal.fromString("100"))
        }
        let stdDebtRatioCall = bond.try_standardizedDebtRatio()
        if(!stdDebtRatioCall.reverted) {
            bd.monolithV2_debt_ratio = stdDebtRatioCall.value;
        }
    }

    //FBEETS
    if (transaction.blockNumber.gt(BigInt.fromString(FBEETSBOND_CONTRACT_BLOCK))){
        let bond = FBeetsBond.bind(Address.fromString(FBEETSBOND_CONTRACT))
        let price_call = bond.try_bondPriceInUSD()
        if(price_call.reverted===false && price_call.value.gt(BigInt.fromI32(0))){
            bd.fBeets_discount = ohmRate.div(toDecimal(price_call.value, 18)).minus(BigDecimal.fromString("1")).times(BigDecimal.fromString("100"))
        }
        let stdDebtRatioCall = bond.try_standardizedDebtRatio()
        if(!stdDebtRatioCall.reverted) {
            bd.fBeets_debt_ratio = stdDebtRatioCall.value;
        }
    }


    bd.save()
}
