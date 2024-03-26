const operators = [
    {
        "OperatorCode": "AT",
        "OperatorName": "Airtel"
    },
    {
        "OperatorCode": "VF",
        "OperatorName": "VodafoneIdea"
    },
    {
        "OperatorCode": "BSNL",
        "OperatorName": "BSNL TopUp"
    },
    {
        "OperatorCode": "BSV",
        "OperatorName": "BSNL Recharge/Validity (RCV)"
    },
    {
        "OperatorCode": "BSG",
        "OperatorName": "BSNL 3G"
    },
    {
        "OperatorCode": "BSS",
        "OperatorName": "BSNL Special (STV)"
    },
    {
        "OperatorCode": "ID",
        "OperatorName": "IdeaVodafone"
    },
    {
        "OperatorCode": "ATX",
        "OperatorName": "Airtel Express"
    },
    {
        "OperatorCode": "MM",
        "OperatorName": "MTNL Mumbai"
    },
    {
        "OperatorCode": "MMS",
        "OperatorName": "MTNL Mumbai Special"
    },
    {
        "OperatorCode": "MD",
        "OperatorName": "MTNL Delhi"
    },
    {
        "OperatorCode": "MDS",
        "OperatorName": "MTNL Delhi Special"
    },
    {
        "OperatorCode": "JIO",
        "OperatorName": "Reliance Jio"
    },
    {
        "OperatorCode": "JIOX",
        "OperatorName": "JIO Express"
    }
  ];
  
  const circleCode =[
    {
        "circlecode": "36",
        "circlename": "ANDAMAN AND NICOBAR ISLANDS"
    },
    {
        "circlecode": "1",
        "circlename": "Andhra Pradesh"
    },
    {
        "circlecode": "26",
        "circlename": "ARUNACHAL PRADESH"
    },
    {
        "circlecode": "2",
        "circlename": "Assam"
    },
    {
        "circlecode": "3",
        "circlename": "Bihar"
    },
    {
        "circlecode": "42",
        "circlename": "Bihar and Jharkhand"
    },
    {
        "circlecode": "4",
        "circlename": "Chennai"
    },
    {
        "circlecode": "27",
        "circlename": "CHHATTISGARH"
    },
    {
        "circlecode": "41",
        "circlename": "DADRA AND NAGAR"
    },
    {
        "circlecode": "40",
        "circlename": "DAMAN AND DIU"
    },
    {
        "circlecode": "5",
        "circlename": "Delhi"
    },
    {
        "circlecode": "28",
        "circlename": "GOA"
    },
    {
        "circlecode": "6",
        "circlename": "Gujarat"
    },
    {
        "circlecode": "7",
        "circlename": "Haryana"
    },
    {
        "circlecode": "8",
        "circlename": "Himachal Pradesh"
    },
    {
        "circlecode": "9",
        "circlename": "Jammu & Kashmir"
    },
    {
        "circlecode": "24",
        "circlename": "Jharkhand"
    },
    {
        "circlecode": "10",
        "circlename": "Karnataka"
    },
    {
        "circlecode": "11",
        "circlename": "Kerala"
    },
    {
        "circlecode": "12",
        "circlename": "Kolkata"
    },
    {
        "circlecode": "39",
        "circlename": "LAKSHADWEEP"
    },
    {
        "circlecode": "14",
        "circlename": "MADHYA PRADESH CHHATTISGARH"
    },
    {
        "circlecode": "13",
        "circlename": "Maharashtra"
    },
    {
        "circlecode": "29",
        "circlename": "MANIPUR"
    },
    {
        "circlecode": "30",
        "circlename": "MEGHALAYA"
    },
    {
        "circlecode": "31",
        "circlename": "MIZORAM"
    },
    {
        "circlecode": "15",
        "circlename": "Mumbai"
    },
    {
        "circlecode": "32",
        "circlename": "NAGALAND"
    },
    {
        "circlecode": "16",
        "circlename": "North East"
    },
    {
        "circlecode": "17",
        "circlename": "Odisha"
    },
    {
        "circlecode": "38",
        "circlename": "PUDUCHERRY"
    },
    {
        "circlecode": "18",
        "circlename": "Punjab"
    },
    {
        "circlecode": "19",
        "circlename": "Rajasthan"
    },
    {
        "circlecode": "33",
        "circlename": "SIKKIM"
    },
    {
        "circlecode": "20",
        "circlename": "Tamil Nadu"
    },
    {
        "circlecode": "37",
        "circlename": "TELANGANA"
    },
    {
        "circlecode": "25",
        "circlename": "TRIPURA"
    },
    {
        "circlecode": "34",
        "circlename": "UTTAR PRADESH"
    },
    {
        "circlecode": "21",
        "circlename": "Uttar Pradesh - East"
    },
    {
        "circlecode": "22",
        "circlename": "Uttar Pradesh - West"
    },
    {
        "circlecode": "35",
        "circlename": "UTTARAKHAND"
    },
    {
        "circlecode": "23",
        "circlename": "West Bengal"
    }
]
 const randomDigit = () => {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
        result += alphanumericChars.charAt(randomIndex);
    }

    return result;
}  

function extractDetails(message) {
    const numberRegex = /\b\d{10}\b/g; // Matches a 10-digit number
  const operatorRegex = /\boperator\s+(\w+)\b/i; // Matches the word after 'operator'
  const circleRegex = /\bcircle\s+code\s+is\s+(\d+)\b/i; // Matches the code after 'circle code is'
  const amountRegex = /\bwith\s+amount\s+(\d+)\b/i; // Matches the amount after 'with amount'

  const numberMatch = message.match(numberRegex);
  const operatorMatch = message.match(operatorRegex);
  const circleMatch = message.match(circleRegex);
  const amountMatch = message.match(amountRegex);

  const number = numberMatch ? numberMatch[0] : null;
  const operator = operatorMatch ? operatorMatch[1] : null;
  const circle = circleMatch ? circleMatch[1] : null;
  const amount = amountMatch ? parseInt(amountMatch[1]) : null;

  return { number, operator, circle, amount };
  } 

function findOperatorCode(operatorName) {
    const operator = operators.find(op => op?.OperatorName?.toLowerCase() === operatorName?.toLowerCase());
    return operator ? operator.OperatorCode : null;
}
  

module.exports = { randomDigit ,extractDetails  ,findOperatorCode};