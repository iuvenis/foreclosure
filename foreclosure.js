'use strict';

var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan () {
  var account = {
                  _borrowed : 550000,
                   _balance : 286000,
            _monthlyPayment : 1700,
                 _defaulted : 0,
     _defaultsToForeclosure : 5,
                _foreclosed : false
  };
  function missPayment() {
    account._defaulted++;
    if (account._defaulted >= account._defaultsToForeclosure){
      account._foreclosed = true;
    }
  }
  function getBalance(){
    return account._balance;
  }
  function receivePayment(amount){
    if (amount < account._monthlyPayment) {
      missPayment();
    }
    account._balance -= amount;
  }
  function getMonthlyPayment(){
    return account._monthlyPayment;
  }
  function isForeclosed(){
    return account._foreclosed;
  }
    return {
            getBalance : getBalance,
        receivePayment : receivePayment,
     getMonthlyPayment : getMonthlyPayment,
          isForeclosed : isForeclosed
        };
}
stevesLoan = loan();

function borrower (loan) {
  var account = {
    _monthlyIncome : 1350,
            _funds : 2800,
             _loan : loan
  };
  function getFunds(){
   return account._funds;
  }
  function makePayment(){
    var _monthlyPayment = account._loan.getMonthlyPayment();

    if (account._funds > _monthlyPayment) {
        account._funds -= _monthlyPayment;
        account._loan.receivePayment(_monthlyPayment);
    }
    else{
      account._loan.receivePayment(account._funds);
       account._funds = 0;

    }
  }

  function payDay(){
    return account._funds += account._monthlyIncome;
  }

   return {
        getFunds : getFunds,
     makePayment : makePayment,
          payDay : payDay
   };
}
steve = borrower(stevesLoan);

monthsUntilEvicted=13;

while(stevesLoan.isForeclosed() === false){
    steve.payDay();
    steve.makePayment();
    month++;
 }