//
// This script was created by HarryTrinh, please don't make a copy with out my credit
//


function alignedPower(trainerElement, trainerPower, attribute1, attribute2, attribute3, attribute1Val, attribute2Val, attribute3Val, bonusPower){
    attribute1Val = parseInt(attribute1Val);
    attribute2Val = parseInt(attribute2Val);
    attribute3Val = parseInt(attribute3Val);

    attribute1Val = calcAttribute(trainerElement, attribute1, attribute1Val);
    if(attribute2Val > 0){
        attribute2Val = calcAttribute(trainerElement, attribute2, attribute2Val);
    }
    if(attribute3Val){
        attribute3Val = calcAttribute(trainerElement, attribute3, attribute3Val);
    }
    var attributeTotal = attribute1Val + attribute2Val + attribute3Val;
    trainerPower = parseInt(trainerPower);
    bonusPower = parseInt(bonusPower);
    // trainerLevel = parseInt(trainerLevel);
    // var result = ((attributeTotal + 1) * trainerPower) + bonusPower + 15 * (trainerLevel - 1);
    var result = ((attributeTotal + 1) * trainerPower) + bonusPower;
    return result;
}

function unalignedPower(trainerPower, attribute1Val=0, attribute2Val=0, attribute3Val=0, bonusPower=0){
   attribute1Val = parseInt(attribute1Val);
   attribute2Val = parseInt(attribute2Val);
   attribute3Val = parseInt(attribute3Val);
   trainerPower = parseInt(trainerPower);
   bonusPower = parseInt(bonusPower);
//    trainerLevel = parseInt(trainerLevel);
   var attributeTotal = attribute1Val + attribute2Val +  attribute3Val;
//    var result = (((attributeTotal * 0.0025) + 1 ) * trainerPower) + bonusPower + 15 * (trainerLevel - 1);
   var result = (((attributeTotal * 0.0025) + 1 ) * trainerPower) + bonusPower;
   return result;
}

//Tính chỉ số cộng hưởng nguyên tố thuộc tính của pet vs trainer
function calcAttribute(trainerElement, attributeElement,  attributeValue){
    // FIRE  -  Lửa
    // EARTH  -  Đất
    // WATER  -  Nước
    // AIR  -  Khí
    // NEUTRAL  -  trung tính
    if (attributeElement != trainerElement){
       return attributeValue * 0.002500;
    }
    if (attributeElement == 'NEUTRAL'){
       return attributeValue * 0.002575;
    }
    if(attributeElement == trainerElement){
       return attributeValue * 0.002675;
    } 
}

// FIRE > EARTH > AIR > WATER > FIRE

// Tính element Bonus dưa vào xung khắc các nguyên tố 
function elementBonus(trainerElement, bunicornElement, enemyElement){
    var TraitBonus = 1
    if(trainerElement == bunicornElement){
        TraitBonus += 0.075;
    }
    if(trainerElement == 'FIRE' && enemyElement == 'EARTH'){
        TraitBonus += 0.075;
    }
    if(trainerElement == 'FIRE' && enemyElement == 'WATER'){
        TraitBonus -= 0.075;
    }
    if(trainerElement == 'EARTH' && enemyElement == 'AIR'){
        TraitBonus += 0.075;
    }
    if(trainerElement == 'EARTH' && enemyElement == 'FIRE'){
        TraitBonus -= 0.075;
    }
    if(trainerElement == 'AIR' && enemyElement == 'WATER'){
        TraitBonus += 0.075;
    }
    if(trainerElement == 'AIR' && enemyElement == 'EARTH'){
        TraitBonus -= 0.075;
    }
    if(trainerElement == 'WATER' && enemyElement == 'FIRE'){
        TraitBonus += 0.075;
    }
    if(trainerElement == 'WATER' && enemyElement == 'AIR'){
        TraitBonus -= 0.075;
    }
    return TraitBonus;
}



function finalPowerValue(trainerElement, trainerPower=0, bunicornElement, attribute1, attribute2, attribute3, attribute1Val=0, attribute2Val=0, attribute3Val=0, bonusPower=0, enemyElement){
    var alignedPwr = alignedPower(trainerElement, trainerPower, attribute1, attribute2, attribute3, attribute1Val, attribute2Val, attribute3Val, bonusPower);
    var elementBns = elementBonus(trainerElement, bunicornElement, enemyElement);
    var final = alignedPwr * elementBns;
    // return [Math.floor(final * 0.9), Math.floor(final * 1.1)]
    return [final * 0.9, final * 1.1];
}

$(document).ready(function() {
    // var html = "<b>Dear user,</b><br/>";
    // html += "<span>We had fixed the problem related to bonus power.</span><br/>";
    // html += "<span>Thank you.</span>";
    // Swal.fire({
    //     icon: 'info',
    //     html: html,
    //     position: 'top',
    //     timer: 5000,
    //     toast: true,
    //     showConfirmButton: false,
    //     showCloseButton: true,
        
    // });
});

$('#btnCalc').on('click', function(){
    //Trainer
    var trainerElement = $('#txtTrainerElement').val();
    // var trainerLevel = $('#txtTrainerLevel').val();
    var trainerPower = $('#txtTrainerPower').val();
    //Bunicorn
    var bunicornElement =  $('#txtBunicornElement').val();
    var attribute1 = $('#txtAttribute1').val();
    var attribute2 = $('#txtAttribute2').val();
    var attribute3 = $('#txtAttribute3').val();
    var attribute1Val = $('#txtAttribute1Val').val();
    var attribute2Val = $('#txtAttribute2Val').val();
    var attribute3Val = $('#txtAttribute3Val').val();
    var bonusPower = $('#txtBonusPower').val();
    var enemyElement = $('#txtEnemyElement').val();
    //Check input
    if (trainerElement == ''){
        MsgBox("Please select your trainer element", '', 'error');
        return;
    }
    if (bunicornElement == ''){
        MsgBox("Please select your bunicorn element", '', 'error');
        return;
    }
    if (attribute1 == ''){
        MsgBox("Please select bunicorn attribute 1 element", '', 'error');
        return;
    }
    if(attribute1 != '' && attribute1Val == ''){
        MsgBox("Please input bunicorn attribute 1 value", '', 'error');
        return;
    }
    if(attribute2 != '' && attribute2Val == ''){
        MsgBox("Please input bunicorn attribute 2 value", '', 'error');
        return;
    }
    else if (attribute2 == ''){
        attribute2Val = 0;
    }
    if(attribute3 != '' && attribute3Val == ''){
        MsgBox("Please input bunicorn attribute 3 value", '', 'error');
        return;
    }
    else if (attribute3 == ''){
        attribute3Val = 0;
    }
    if(bonusPower == ''){
        bonusPower = 0;
    }
    if (enemyElement == ''){
        MsgBox("Please select enemy element", '', 'error');
        return;
    }
    if (enemyElement == ''){
        MsgBox("Please input enemy power", '', 'error');
        return;
    }
    var enemyPwr = $('#txtEnemyPower').val();
    var minEnemyPwr = parseInt(enemyPwr) * 0.9;
    var maxEnemyPwr = parseInt(enemyPwr) * 1.1;
    var winRate = 0.0;
    var buniPWR = bunicornPowerMultiplier(bunicornElement, attribute1, attribute2, attribute3, attribute1Val, attribute2Val, attribute3Val, bonusPower);
    var playerBasePWR = playerBasePower(trainerPower, buniPWR);
    var PlayerPWR = playerPower(playerBasePWR, trainerElement, bunicornElement, enemyElement);
    var pwr = [PlayerPWR * 0.9, PlayerPWR * 1.1]

    var exp = expGain(enemyPwr, playerBasePWR);
    var rwUSD = rewardUSD(enemyPwr, getStar())
    var str = `<i class="bi bi-lightning-charge"></i> Your power: ${Math.floor(pwr[0])} ~ ${Math.floor(pwr[1])}`;
    $('#lbResult').html(str);
    winRate = winRateCalc(Math.floor(pwr[0]), Math.floor(pwr[1]), Math.floor(minEnemyPwr), Math.floor(maxEnemyPwr));
    
    $('#lbWinRate').html('<i class="bi bi-trophy"></i> Win rate: ' + Math.floor(winRate) + '%');
    $('#lbWinRate').prop('class', '');
    var icon = winRate < 90 ? 'warning':'success';
    var txtClass = winRate < 90 ? 'text-danger':'text-success';
    $('#lbWinRate').addClass(txtClass);

    $('#lbExpGained').html('+' + exp + ' XP')
    $('#lbReward').html('Reward: ~$' + rwUSD)

    Toast(`Win rate: ${Math.floor(winRate)}%`, icon);

})


function bunicornPowerMultiplier(bunicornElement, attribute1, attribute2, attribute3, attribute1Val, attribute2Val, attribute3Val, bonusAttribute){
    const attribute_baseline = 500;
    attribute1Val = parseInt(attribute1Val);
    attribute2Val = parseInt(attribute2Val);
    attribute3Val = parseInt(attribute3Val);
    bonusAttribute = parseInt(bonusAttribute);

    attribute1Val = attribute1Val * factor(bunicornElement, attribute1);
    if(attribute2Val > 0){
        attribute2Val = attribute2Val * factor(bunicornElement, attribute2);
    }
    if(attribute3Val){
        attribute3Val = attribute3Val * factor(bunicornElement, attribute3);
    }
    var attributeTotal = attribute1Val + attribute2Val + attribute3Val + (bonusAttribute * 1.05);
    let bPWR = 1 + (attributeTotal / attribute_baseline);
    return bPWR;
}

/* Factor được tính như sau:
Nếu chỉ số thuộc tính cùng với thuộc tính của bunicorn thì factor = 1.1
Nếu chỉ số thuộc tính có thuộc tính là NEUTRAL thì factor = 1.05
Trường hợp còn lại factor = 1
Bonus attribute cũng được cộng vào công thức này, factor = 1.05 giống như NEUTRAL */

function factor(bunicornElement, attributeElement){
    let factor = 1;
    if(attributeElement === bunicornElement){
        factor = 1.1;
    }
    else if(attributeElement === 'NEUTRAL'){
        factor = 1.05;
    }
    return factor;
}

function playerBasePower(trainerPower, bunicornPowerMultiplier){
    return trainerPower * bunicornPowerMultiplier;
}

function playerPower(playerBasePower, trainerElement, bunicornElement, enemyElement){
    let bonus = (playerBasePower * 0.065); // 6.5%
    if(trainerElement === bunicornElement){
        playerBasePower += bonus;
    }
    if(trainerElement == 'FIRE' && enemyElement == 'EARTH'){
        playerBasePower += bonus;
    }
    if(trainerElement == 'FIRE' && enemyElement == 'WATER'){
        playerBasePower -= bonus;
    }
    if(trainerElement == 'EARTH' && enemyElement == 'AIR'){
        playerBasePower += bonus;
    }
    if(trainerElement == 'EARTH' && enemyElement == 'FIRE'){
        playerBasePower -= bonus;
    }
    if(trainerElement == 'AIR' && enemyElement == 'WATER'){
        playerBasePower += bonus;
    }
    if(trainerElement == 'AIR' && enemyElement == 'EARTH'){
        playerBasePower -= bonus;
    }
    if(trainerElement == 'WATER' && enemyElement == 'FIRE'){
        playerBasePower += bonus;
    }
    if(trainerElement == 'WATER' && enemyElement == 'AIR'){
        playerBasePower -= bonus;
    }
    return playerBasePower;
}

function rewardUSD(enemyPower, bunicorn_star){
//     hằng số reward_gas_offset = 0.5 (USD)
// hằng số reward_baseline = 0.4 (USD)
    enemyPower = parseInt(enemyPower);
    const reward_gas_offset = 0.5;
    const reward_baseline = 0.4;
    let reward_multiplier = Math.sqrt(enemyPower/1000 * bunicorn_star)
    let reward = reward_gas_offset + reward_baseline * reward_multiplier;
    return reward.toFixed(2);
}

function expGain(enemyPower, playerBasePower){
    enemyPower = parseInt(enemyPower);
    let expGained = Math.floor((enemyPower/playerBasePower) * 32);
    return expGained;
}

function getStar(){
    var star5 = $('#star5').prop('checked');
    var star4 = $('#star4').prop('checked');
    var star3 = $('#star3').prop('checked');
    var star2 = $('#star2').prop('checked');
    var star1 = $('#star1').prop('checked');
    if(star5){
        return 5;
    }
    if(star4){
        return 4;
    }
    if(star3){
        return 3;
    }
    if(star2){
        return 2;
    }
    if(star1){
        return 1;
    }
}


function winRateCalc(minYourPower, maxYourPower, minEnemyPower, maxEnemyPower){
    let minimumPower = Math.min(minYourPower, maxYourPower, minEnemyPower, maxEnemyPower);
    let maximumPower = Math.max(minYourPower, maxYourPower, minEnemyPower, maxEnemyPower);
    let totalCount = maximumPower - minimumPower + 1;
   let match = 0;
   for (let e = minEnemyPower; e <= maxEnemyPower; e++) {
       for (let a = minYourPower; a <= maxYourPower; a++) {
           if(a == e)
           {
               match ++;
           }
       }
       
   }
   let mR = (match / totalCount);
   let diff1 = minYourPower - minEnemyPower;
   let diff2  = maxYourPower - maxEnemyPower;
   let diff1R = diff1 / totalCount;
   let diff2R = diff2 / totalCount;
   let rate = diff1R + diff2R + (mR / 2);
//    let rate = ((minYourPower - minEnemyPower) + (maxYourPower - maxEnemyPower) + (match / 2)) / totalCount;
   if(rate <= 0){
       return 0;
   }
   else{
    return rate * 100;
   }
}


function MsgBox(title, message, icon){
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        //confirmButtonText: 'Cool'
      })
}

function Toast(text, icon='info'){
    Swal.fire({
        icon: icon,
        text: text,
        timer: 3000,
        position: 'center',
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
    });
}

