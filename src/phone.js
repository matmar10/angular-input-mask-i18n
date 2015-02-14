'use strict';

/* global angular: true */
/* jshint quotmark: false */
/* jshint maxlen: false */

var plans = {
    "AF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^937[05789][0-9]{6,7}$"
        ]
    },
    "AL": {
        "countryDialingCode": 355,
        "nationalDialingPrefix": 0,
        "format": [
            "^3556[7-9][0-9]{7}$"
        ]
    },
    "DZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^213[5-9][0-9]{7}$",
            "^213(55|66|77)[0-9]{7}$",
            "^213(79[0-6]|69[7-9])[0-9]{6}$"
        ]
    },
    "AR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^54[0-9]{10}$"
        ]
    },
    "AS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1684(25[248]|73[13])[0-9]{4}$"
        ]
    },
    "AD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^376[346][0-9]{5}$"
        ]
    },
    "AO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2449[12][0-9]{7}$"
        ]
    },
    "AI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1264(235|476|5(3[6-9]|8[1-4])|7(29|72))[0-9]{4}$"
        ]
    },
    "AG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1268(464|7(64|7[0-5]|8[358]))[0-9]{4}$",
            "^126872[0-9]{5}$"
        ]
    },
    "AM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^374(77|99|9[1-4])[0-9]{6}$"
        ]
    },
    "AW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^297(56|59|96)[0-9]{5}$",
            "^297(990|99[2-9])[0-9]{4}$"
        ]
    },
    "AU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^614[0-1][0-9]{7}$",
            "^614(2([1-4]|[7-9])|3([0-4]|[7-9])|4[89])[0-9]{6}$",
            "^61425([1-3]|[6-8])[0-9]{5}$"
        ]
    },
    "AT": {
        "countryDialingCode": 43,
        "nationalDialingPrefix": 0,
        "format": [
            "^436[7-9][0-9]{5,11}$",
            "^436(44|5([0-3]|[579])|6[01]|6[3-9])[0-9]{4,10}$"
        ]
    },
    "AZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^994(40|5[015]|70)[0-9]{7}$",
            "^99460540[0-9]{4}$"
        ]
    },
    "BS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1242(357|359|457|557)[0-9]{4}$"
        ]
    },
    "BH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9733[69][0-9]{6}$",
            "^973377[0-9]{5}$",
            "^973383[0-9]{5}$"
        ]
    },
    "BD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^8801[1-9][0-9]{8}$"
        ]
    },
    "BB": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^124626[0-9]{5,8}$"
        ]
    },
    "BY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^375(29|44|33)[0-9]{7}$",
            "^375259[0-9]{6}$"
        ]
    },
    "BE": {
        "countryDialingCode": 32,
        "nationalDialingPrefix": 0,
        "format": [
            "^324[0-9]{8}$"
        ]
    },
    "BZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^501(62[01])[0-9]{4}$",
            "^501(6[67])[0-9]{5}$"
        ]
    },
    "BJ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2299[0-9]{7}$"
        ]
    },
    "BM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1441([37][0-9]{6}|5[0-3][0-9]{5}|59[09][0-9]{4})$"
        ]
    },
    "BT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^97517[0-9]{6}$"
        ]
    },
    "BO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5917(0[6-8]|1([01]|[4-9])|2([0-2]|[89])|7[0-5])[0-9]{5}$",
            "^5917(11[2-4]|24[015])[0-9]{4}$"
        ]
    },
    "BA": {
        "countryDialingCode": 387,
        "nationalDialingPrefix": 0,
        "format": [
            "^3876[12356][0-9]{6,7}$"
        ]
    },
    "BW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2677[34][0-9]{6}$"
        ]
    },
    "BR": {
        "countryDialingCode": '55',
        "mask": "(00) 00000-0000",
        "nationalDialingPrefix": null,
        "format": [
            "^55(1[1-9]|2[12478]|3[1234578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])[89][0-9]{7}$"
        ]
    },
    "VI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1284(30[0-3]|44[0-5]|4(68|96|99)|54[0-4])[0-9]{4}$"
        ]
    },
    "BN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^673[78][0-9]{6}$"
        ]
    },
    "BG": {
        "countryDialingCode": 359,
        "nationalDialingPrefix": 0,
        "format": [
            "^359(4[38]|8[789]|98)[0-9]{5,7}$"
        ]
    },
    "BF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2267[01568][0-9]{6}$"
        ]
    },
    "BI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^257(2955|795[6-9])[0-9]{4}$",
            "^2577(66|77|88|99)[0-9]{5}$"
        ]
    },
    "KH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^855[19][0-9]{7,8}$"
        ]
    },
    "CA": {
        "countryDialingCode": 1,
        "nationalDialingPrefix": 1,
        "format": [
            "^1(403|250|289|204|306|403|289|587|780|604|778|250|204|506|709|867|906|289|519|226|705|613|807|416|647|902|418|581|450|514|438|819|306|867)[0-9]{7}$"
        ]
    },
    "CL": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^56[89][0-9]{7,8}$"
        ]
    },
    "CM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^237[79][0-9]{7}$"
        ]
    },
    "CV": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2389[0-9]{6}$"
        ]
    },
    "KY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1345(32([3-7]|9)|5(1[467]|2[5-7]|4[5-9])|9(1[679]|2[4-9]|3[089]))[0-9]{4}$"
        ]
    },
    "CF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2367[0257][0-9]{6}$"
        ]
    },
    "TD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^235(620|679|980)[0-9]{4}$"
        ]
    },
    "CN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^861[35][0-9]{9}$",
            "^86189[0-9]{8}$"
        ]
    },
    "CO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^573(00|1[012356])[0-9]{7}$"
        ]
    },
    "KM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2693[23][0-9]{5}$"
        ]
    },
    "CG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^242[4-6][0-9]{6}$"
        ]
    },
    "CD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^243(68|80|81|88|98|99)[0-9]{7}$"
        ]
    },
    "CK": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6827[0-9]{4}$"
        ]
    },
    "CR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5068[0-9]{6,7}$"
        ]
    },
    "CI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2250[0-9]{7}$",
            "^225(4[4-8]|6[067])[0-9]{6}$"
        ]
    },
    "HR": {
        "countryDialingCode": 385,
        "nationalDialingPrefix": 0,
        "format": [
            "^3859[12589][0-9]{7,10}$"
        ]
    },
    "CU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^535[0-9]{6,7}$"
        ]
    },
    "CY": {
        "countryDialingCode": 357,
        "nationalDialingPrefix": null,
        "format": [
            "^3579(6|7[67]|9[0-689])[0-9]{5,6}$",
            "^357997[14-9][0-9]{4}$"
        ]
    },
    "CZ": {
        "countryDialingCode": 420,
        "nationalDialingPrefix": null,
        "format": [
            "^42060[1-8][0-9]{6}$",
            "^4207[2379][0-9]{7}$"
        ]
    },
    "DK": {
        "countryDialingCode": 45,
        "nationalDialingPrefix": null,
        "format": [
            "^452[0-9]{7}$",
            "^45(3[01]|4[01]|5[0-2]|6[01])[0-9]{6}$"
        ]
    },
    "DJ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2536[0-9]{5}$",
            "^2538[0-5][0-9]{4}$"
        ]
    },
    "DM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1767(2(25|35|45|65|7[567])|31[567]|61[456])[0-9]{4}$"
        ]
    },
    "DO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1809[0-9]{7}$",
            "^1829[0-9]{7}$",
            "^1849[0-9]{7}$"
        ]
    },
    "TL": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6707[0-9]{6}$"
        ]
    },
    "EC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^593(8|9)[0-9]{6}$"
        ]
    },
    "EG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^201[01268][0-9]{7}$"
        ]
    },
    "SV": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5037[0-9]{7}$"
        ]
    },
    "GQ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^240[256][0-9]{5}$"
        ]
    },
    "ER": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^29117[1-3][0-9]{4}$",
            "^2917[0-9]{6}$"
        ]
    },
    "EE": {
        "countryDialingCode": 372,
        "nationalDialingPrefix": null,
        "format": [
            "^3728[1-5][0-9]{6}$",
            "^3725[0-9]{6,7}$"
        ]
    },
    "ET": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^25191[0-9]{7}$"
        ]
    },
    "FK": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^500[56][0-9]{4}$"
        ]
    },
    "FO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2982[0-9]{5}$",
            "^298(7[5-9]|9[1-5])[0-9]{4}$"
        ]
    },
    "FJ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^679(7[0-4]|9[29])[0-9]{5}$"
        ]
    },
    "FR": {
        "countryDialingCode": 33,
        "nationalDialingPrefix": 0,
        "format": [
            "^33[67][0-9]{8}$"
        ]
    },
    "GF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^594694[0-9]{6}$"
        ]
    },
    "PF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^689[27][0-9]{5}$",
            "^6893[01][0-9]{4}$",
            "^68975[48][0-9]{3}$",
            "^6894114[0-9]{2}$"
        ]
    },
    "GA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2410[567][0-9]{6}$"
        ]
    },
    "GM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^220(7[02789]|9[7-9])[0-9]{5}$",
            "^22077[05-9][0-9]{4}$"
        ]
    },
    "GE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^995(5[578]|77|93)[0-9]{6}$"
        ]
    },
    "DE": {
        "countryDialingCode": 49,
        "nationalDialingPrefix": 0,
        "format": [
            "^4915(05|1[125]|2[025]|7[03578])[0-9]{7}$",
            "^491(6[023489]|7[0-9])[0-9]{7,8}$"
        ]
    },
    "FI": {
        "countryDialingCode": 358,
        "nationalDialingPrefix": 0,
        "format": [
            "^358(4[0-9]|50)[0-9]{7}$"
        ]
    },
    "GH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^233(2[36]|54)[0-9]{7}$"
        ]
    },
    "GI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^350(5[4678]|60)[0-9]{6}$"
        ]
    },
    "GR": {
        "countryDialingCode": 30,
        "nationalDialingPrefix": null,
        "format": [
            "^309[347][0-9]{8}$",
            "^3069[0349][0-9]{7}$"
        ]
    },
    "GL": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^299(49|5[2-9])[0-9]{4}$"
        ]
    },
    "GD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1473(53[3-8]|4(0[3-79]|1[04-9]|20|58))[0-9]{4}$"
        ]
    },
    "GP": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^590690[0-9]{6}$"
        ]
    },
    "GU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1671(48[238]|726|8[6-9]8)|9(22|69))[0-9]{4}$"
        ]
    },
    "GT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^502[45][0-9]{7}$"
        ]
    },
    "GW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^245[567][0-9]{6}$"
        ]
    },
    "GN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2246[02-7][0-9]{6}$"
        ]
    },
    "GY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5926[0-9]{6}$"
        ]
    },
    "GG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^447839[1278][0-9]{5}$",
            "^447781[0-9]{6}$"
        ]
    },
    "HT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^509(3[3-9]|40|9[04])[0-9]{5,6}$"
        ]
    },
    "HN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^504[3789][0-9]{7}$"
        ]
    },
    "HK": {
        "countryDialingCode": 852,
        "nationalDialingPrefix": null,
        "format": [
            "^852[569][0-9]{7}$"
        ]
    },
    "HU": {
        "countryDialingCode": 36,
        "nationalDialingPrefix": 6,
        "format": [
            "^36[237]0[0-9]{5,7}$"
        ]
    },
    "IE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^35308[235-9][0-9]{5,6}$"
        ]
    },
    "IS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^354(95[48]|77[0-3])[0-9]{4}$",
            "^354(6|8|38[089])[0-9]{6}$"
        ]
    },
    "IN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^919[0-9]{9}$",
            "^9110[1-4][0-9]{8}$"
        ]
    },
    "ID": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6281[16]0[0-9]{6}$",
            "^628[23][0-9]{7}$",
            "^6281(1[1-9]|[235-9])[0-9]{6,7}$",
            "^628[568][0-9]{7,8}$",
            "^6281(1[1-9]|[235-9])[0-9]{5}$"
        ]
    },
    "IR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9891[2678][0-9]{7}$"
        ]
    },
    "IQ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^96407[5789][0-9]{8}$"
        ]
    },
    "IL": {
        "countryDialingCode": 972,
        "nationalDialingPrefix": 0,
        "format": [
            "^972[0-9]{9}$"
        ]
    },
    "IM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^447924[0-4][0-9]{5}$"
        ]
    },
    "IT": {
        "countryDialingCode": 39,
        "nationalDialingPrefix": 0,
        "format": [
            "^393[0-9]{8,9}$"
        ]
    },
    "JM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1876[2-9][0-9]{6}$"
        ]
    },
    "JP": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^81[89]0[0-9]{8}$"
        ]
    },
    "JE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^447(509[0125]|5372|700[378]|797[7-9]|82(23|9[789])|9780)[0-9]{5}$",
            "^447937[0-9]{6}$"
        ]
    },
    "JO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^96274(5[4-7]|66|77)[0-9]{5}$",
            "^9627(7[569]|8[568]|9[0567])[0-9]{6}$"
        ]
    },
    "KZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^77(0[01257]|6[0-3]|77)[0-9]{7}$",
            "^77(1[2-578]9[01]|2([13-7]9[01]|758))[0-9]{5}$"
        ]
    },
    "KE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^254(7[237]|84)[0-9]{7,8}$"
        ]
    },
    "KI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^686(30|69)[0-9]{3}$"
        ]
    },
    "KP": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^85019[0-9]{5}$"
        ]
    },
    "KR": {
        "countryDialingCode": 82,
        "nationalDialingPrefix": 0,
        "format": [
            "^821[016-9][0-9]{7,8}$"
        ]
    },
    "KW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^965[569][0-9]{6,7}$"
        ]
    },
    "KG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^996(5[14-7]|77)[0-9]{7}$",
            "^996700[0-9]{6}$"
        ]
    },
    "LA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^85620[0-9]{7}$"
        ]
    },
    "LV": {
        "countryDialingCode": 371,
        "nationalDialingPrefix": null,
        "format": [
            "^3712[0-9]{6,7}$"
        ]
    },
    "LB": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^961(3|70)[0-9]{6}$"
        ]
    },
    "LS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^266[56][0-9]{7}$"
        ]
    },
    "LR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^231(4[0167]|6[4-9])[0-9]{5}$",
            "^2315[0-9]{6}$",
            "^2317[0-9]{7}$"
        ]
    },
    "LY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2189[12][0-9]{7}$"
        ]
    },
    "LI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^4236[0-9]{6,8}$"
        ]
    },
    "LT": {
        "countryDialingCode": 370,
        "nationalDialingPrefix": 0,
        "format": [
            "^3706[0-9]{7}$"
        ]
    },
    "LU": {
        "countryDialingCode": 352,
        "nationalDialingPrefix": null,
        "format": [
            "^3526[0-9]{8}$"
        ]
    },
    "MO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^85366[0-9]{6}$"
        ]
    },
    "MK": {
        "countryDialingCode": 389,
        "nationalDialingPrefix": 0,
        "format": [
            "^3897[0125-8][0-9]{6}$"
        ]
    },
    "MX": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^52[0-9]{10}$"
        ]
    },
    "MG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2613[0-3][0-9]{7}$"
        ]
    },
    "MW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^265[4589][0-9]{6}$"
        ]
    },
    "MY": {
        "countryDialingCode": 60,
        "nationalDialingPrefix": 0,
        "format": [
            "^601[0-9]{7,8}$"
        ]
    },
    "MV": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^960(7[6-9]|9[6-9])[0-9]{5}$"
        ]
    },
    "ML": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^223[67][0-9]{7}$"
        ]
    },
    "MT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^356[79][79][0-9]{6}$",
            "^356981[12][0-9]{4}$"
        ]
    },
    "MH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^692(45|62|23)5[0-9]{4}$"
        ]
    },
    "MQ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^596696[0-9]{6}$"
        ]
    },
    "MR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2226[34][0-9]{5}$"
        ]
    },
    "MU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2307[0-9]{6}$",
            "^230(49|9[134578])[0-9]{5}$",
            "^230(42[12389]|87[1567])[0-9]{4}$"
        ]
    },
    "YT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^269639[0-9]{6}$"
        ]
    },
    "FM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6919[2357]0[0-9]{4}$"
        ]
    },
    "MD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^373(6([589]0|7[12])|7[89]0)[0-9]{5}$"
        ]
    },
    "MC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^377[46][0-9]{7,8}$"
        ]
    },
    "MN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^976(88|9[1569])[0-9]{6}$"
        ]
    },
    "ME": {
        "countryDialingCode": 382,
        "nationalDialingPrefix": 0,
        "format": [
            "^382(6[379]|70)[0-9]{3,10}$",
            "^38268[0-9]{2,10}$"
        ]
    },
    "MS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1664492[0-9]{4}$"
        ]
    },
    "MA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^212[167][0-9]{7}$",
            "^212(4[0124-8]|5[01])[0-9]{6}$"
        ]
    },
    "MZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^258[89][0-9]{8}$"
        ]
    },
    "MM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^959[0-9]{7,8}$"
        ]
    },
    "NA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^26481[0-9]{7}$"
        ]
    },
    "NR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^674555[0-9]{4}$"
        ]
    },
    "NL": {
        "countryDialingCode": 31,
        "nationalDialingPrefix": 0,
        "format": [
            "^316[0-9]{8}$"
        ]
    },
    "AN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^599([59]4|98)[0-9]{5}$",
            "^599(318|416|5(25|8[239])|71[578]|9(50|7[34]))[0-9]{4}$",
            "^5999(7(2[0-3]|6[3567]|777))[0-9]{3}$"
        ]
    },
    "NC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6879[0-9]{5}$",
            "^687(7[5-9]|8[0-79])[0-9]{4}$"
        ]
    },
    "NZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^642[01345789][0-9]{6,8}$"
        ]
    },
    "NI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^505[68][0-9]{6}$"
        ]
    },
    "NE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2779[0-9]{7}$"
        ]
    },
    "NG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^23490[0-9]{6}$",
            "^234(703|80[2-7])[0-9]{7}$"
        ]
    },
    "NF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^67238[0-9]{4}$"
        ]
    },
    "NO": {
        "countryDialingCode": 47,
        "nationalDialingPrefix": null,
        "format": [
            "^47[49][0-9]{7,8}$"
        ]
    },
    "OM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9689[25-9][0-9]{6}$"
        ]
    },
    "PK": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^923[0-9]{9}$"
        ]
    },
    "PW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^680(6[234689]0|77[59])[0-9]{4}$"
        ]
    },
    "PS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9705[59][0-9]{7}$"
        ]
    },
    "PA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5076[0-9]{6,7}$"
        ]
    },
    "PG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^675170[0-9]{2}$",
            "^675189[0-9]$",
            "^6756[1-3][0-9]{6}$",
            "^6756[5-9][0-9]{5}$"
        ]
    },
    "PY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5959[0-9]{8}$"
        ]
    },
    "PE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^519[0-9]{9,10}$",
            "^5119[0-9]{8}$"
        ]
    },
    "PH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^639[0-9]{8,9}$"
        ]
    },
    "PL": {
        "countryDialingCode": 48,
        "nationalDialingPrefix": 0,
        "format": [
            "^48(5[01]|6[069]|7[89]|88)[0-9]{7}$",
            "^4872[12][0-9]{6}$"
        ]
    },
    "PT": {
        "countryDialingCode": 351,
        "nationalDialingPrefix": null,
        "format": [
            "^3519[0-9]{8}$"
        ]
    },
    "PR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1(787|939)[0-9]{10}$"
        ]
    },
    "QA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^974[356][0-9]{6}$"
        ]
    },
    "RE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^26269[23][0-9]{6}$"
        ]
    },
    "RO": {
        "countryDialingCode": 40,
        "nationalDialingPrefix": 0,
        "format": [
            "^407(2[0123]|4[045]|61|62|66|88)[0-9]{6}$"
        ]
    },
    "RU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^79[0-9]{9}$"
        ]
    },
    "RW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2500[358][0-9]{6}$"
        ]
    },
    "KN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1869(5(5[678]|6[567])|66[2-57-9]|76[2-5])[0-9]{4}$"
        ]
    },
    "LC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1758(28[4-7]|384|4(6[01]|8[4-9])|5(1[89]|20|84)|72[034])[0-9]{4}$",
            "^175871[0-9]{5}$"
        ]
    },
    "PM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^50855[0-9]{4}$"
        ]
    },
    "VC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1784(4(3[0124]|5[45]|9[2-5])|5(2[6-9]|3[0-3]|93))[0-9]{4}$"
        ]
    },
    "WS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6857[2567][0-9]{5}$"
        ]
    },
    "SM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^3786[0-9]{8,12}$"
        ]
    },
    "ST": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^23960[0-9]{4}$"
        ]
    },
    "SA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9665[0-9]{8}$"
        ]
    },
    "SN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2217[67][0-9]{7}$"
        ]
    },
    "RS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^3816[0-9]{3,11}$"
        ]
    },
    "SC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^248[579][0-9]{5}$"
        ]
    },
    "SL": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^232(25|3[03]|40|5[05]|7[678]|88)[0-9]{6}$"
        ]
    },
    "SG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^65525[0-9]{5}$",
            "^6581[0-9]{6}$"
        ]
    },
    "SK": {
        "countryDialingCode": 421,
        "nationalDialingPrefix": 0,
        "format": [
            "^4219[01][0-9]{7}$",
            "^421949[01][0-9]{6}$"
        ]
    },
    "SI": {
        "countryDialingCode": 386,
        "nationalDialingPrefix": 0,
        "format": [
            "^386(3[01]|4[01]|51|6[4-9]|7[01])[0-9]{5,6}$",
            "^386(30)[0-9]{5,6}$"
        ]
    },
    "SB": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6776[5-9][0-9]{3}$",
            "^677[89][0-9]{4}$"
        ]
    },
    "SO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2529[01][0-9]{6}$"
        ]
    },
    "ZA": {
        "countryDialingCode": 27,
        "nationalDialingPrefix": 0,
        "format": [
            "^27[78][0-9]{4,11}$"
        ]
    },
    "ES": {
        "countryDialingCode": 34,
        "nationalDialingPrefix": null,
        "format": [
            "^346[0-9]{8}$"
        ]
    },
    "LK": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^947[12578][0-9]{7}$"
        ]
    },
    "SD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2499[12][0-9]{7}$"
        ]
    },
    "SR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^59775[0-9]{5}$",
            "^597[89][0-9]{6}$"
        ]
    },
    "SZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2686[0-7][0-9]{4}$"
        ]
    },
    "SE": {
        "countryDialingCode": 46,
        "nationalDialingPrefix": 0,
        "format": [
            "^467[036][0-9]{5,7}$"
        ]
    },
    "CH": {
        "countryDialingCode": 41,
        "nationalDialingPrefix": 0,
        "format": [
            "^417[46-9][0-9]{7}$"
        ]
    },
    "SY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9639[0-9]{8}$"
        ]
    },
    "TW": {
        "countryDialingCode": 866,
        "nationalDialingPrefix": 0,
        "format": [
            "^8869[0-9]{7,8}$"
        ]
    },
    "TJ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9929190[0-3][0-9]{4}$",
            "^992918[68][0-9]{5}$",
            "^9929(17|27|35|51|62|73|81|98)[0-9]{6}$"
        ]
    },
    "TZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2557[1-9][0-9]{7}$"
        ]
    },
    "TH": {
        "countryDialingCode": 66,
        "nationalDialingPrefix": 0,
        "format": [
            "^668[013-9][0-9]{6,7}$"
        ]
    },
    "TG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2289(0[1-5]|4[6-9])[0-9]{4}$"
        ]
    },
    "TO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^676(1[5-9]|4[69]|5[3-9]|6[3-9]|7[567]|8[789])[0-9]{3,5}$"
        ]
    },
    "TT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1868(22[1-4]|4(2[01]|8[0-4])|6(20|78))[0-9]{4}$",
            "^1868(29|4[01679]|68)[0-9]{5}$",
            "^1868[37][0-9]{6}$"
        ]
    },
    "TR": {
        "countryDialingCode": 90,
        "nationalDialingPrefix": 0,
        "format": [
            "^905[0-9]{9}$"
        ]
    },
    "TM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9936[0-9]{7}$"
        ]
    },
    "TC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1649(2(3[12]|4[1-5])|3(3[123]|4[1-5])|4(3[12]|4[12]))[0-9]{4}$"
        ]
    },
    "TV": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6889[0-9]{4}$"
        ]
    },
    "UG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2567[1578][0-9]{7}$",
            "^25670[0-4][0-9]{6}$"
        ]
    },
    "UA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^380(39|50|6[3678]|9[1-9])[0-9]{7}$"
        ]
    },
    "US": {
        "countryDialingCode": 1,
        "nationalDialingPrefix": 1,
        "mask": "(000) 000-0000",
        "format": [
            "^1[0-9]{10}$"
        ]
    },
    "AE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9715[05][0-9]{7}$"
        ]
    },
    "GB": {
        "countryDialingCode": 44,
        "nationalDialingPrefix": 0,
        "format": [
            "^447[045789][0-9]{8}$"
        ]
    },
    "VG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1340(2(26|77)|3(32|44)|47[34]|677|998)[0-9]{4,7}$"
        ]
    },
    "UY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5989[4-9][0-9]{6,7}$"
        ]
    },
    "UZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9989[0-3789][0-9]{7}$"
        ]
    },
    "VU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^678(5[45]|77)[0-9]{5}$"
        ]
    },
    "VE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^58(41|25)[24-8][0-9]{7}$"
        ]
    },
    "VN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^841(2[1236]|6[6-9])[0-9]{7}$",
            "^84(2|4|9)[0-9]{8}$"
        ]
    },
    "WF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6819[0-9]{5}$"
        ]
    },
    "YE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9677[137][0-9]{7}$"
        ]
    },
    "ZM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2609[567][0-9]{6,7}$"
        ]
    },
    "ZW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^263(11|23|91)[0-9]{6}$"
        ]
    }
};

angular.module('ui.utils.masks.phone-number-plans', []).constant('phoneNumberingPlans', plans);
angular.module('ui.utils.masks.phone', ['ui.utils.masks.phone-number-plans']);

angular.module('ui.utils.masks.phone').factory('PhoneValidators', [function() {

    var country, validators = {};

    function tryToValidate(msisdn, formats) {
        var i, re;
        for (i = 0; i < formats.length; i++) {
            re = new RegExp(formats[i]);
            if (re.test(msisdn)) {
              console.log('MATCHED: ', formats[i]);
                return true;
            }
        }
        return false;
    }

    function buildValidator(country, plan) {
        return function (ctrl, value) {
            var valid;
            value = value || '';
            value = value.replace(/[^0-9]/g, '');

            // TODO: remove national dialing prefix and try that also
            valid = ctrl.$isEmpty(value) || tryToValidate(value, plan.format) ||
              tryToValidate(plan.countryDialingCode + value, plan.format);

            ctrl.$setValidity(country.toLowerCase() + '-phone-number', valid);
            return value;
        };
    }

    // build a validator for every plan possible
    for (country in plans) {
        if (!plans.hasOwnProperty(country)) {
            continue;
        }
        // plan not implemented yet
        if (!plans[country].countryDialingCode) {
            continue;
        }
        validators[country.toLowerCase() + 'PhoneNumber'] = buildValidator(country, plans[country]);
    }

    return validators;
}]);

angular.module('ui.utils.masks.phone').directive('uiPhoneNumber', ['PhoneValidators', function(PhoneValidators) {

    function clearValue (value) {
        if(!value) {
            return value;
        }

        return value.replace(/[^0-9]/g, '');
    }

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ctrl) {
            /* global StringMask */
            var country, phoneMask;

            country = (attrs.uiPhoneNumber || '').toUpperCase();
            phoneMask = new StringMask(plans[country].mask);

            function applyPhoneMask (value) {
                var formattedValue;

                if(!value) {
                    return value;
                }

                formattedValue = phoneMask.apply(value);
                return formattedValue.trim().replace(/[^0-9]$/, '');
            }

            if (!ctrl) {
                return;
            }

            ctrl.$formatters.push(function(value) {
                return applyPhoneMask(PhoneValidators[country.toLowerCase() + 'PhoneNumber'](ctrl, value));
            });

            ctrl.$parsers.push(function(value) {
                var cleanValue, formattedValue;

                if (!value) {
                    return value;
                }

                cleanValue = clearValue(value);
                formattedValue = applyPhoneMask(cleanValue);

                if (ctrl.$viewValue !== formattedValue) {
                    ctrl.$setViewValue(formattedValue);
                    ctrl.$render();
                }

                return clearValue(formattedValue);
            });

            ctrl.$parsers.push(function(value) {
                return PhoneValidators[country.toLowerCase() + 'PhoneNumber'](ctrl, value);
            });
        }
    };
}]);
