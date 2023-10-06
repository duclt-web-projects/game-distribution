<script setup lang="ts">
import { RESPONSE_STATUS } from "@/constants";
import { ROUTE_NAMES } from "@/constants/routes";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";

useHead({
  title: "Login - XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
    { name: "ogTitle", content: "Login - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
  ],
});

const userStore = useUserStore();

const { $toast } = useNuxtApp();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errors = ref({
  email: "",
  password: "",
});

const login = async () => {
  if (!validate()) return;

  isLoading.value = true;

  const response = await userStore.login({ email: email.value, password: password.value });

  if (response.status === RESPONSE_STATUS.SUCCESS) {
    isLoading.value = false;
    $toast.success(response.message);

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.USER_GAME);
    }, 500);
  } else {
    $toast.error(response.message);
  }
};

const validate = () => {
  errors.value.email = "";
  errors.value.password = "";

  if (!email.value) {
    errors.value.email = "Email is required.";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    errors.value.email = "Invalid Email.";
  }

  if (!password.value) {
    errors.value.password = "Password is required.";
  }

  if (errors.value.email || errors.value.email) return false;

  return true;
};
</script>

<template>
  <AuthLayout>
    <template #star>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </template>
    <form @submit.prevent="login">
      <InputTextAuth placeholder="Email" v-model:input="email" inputType="email" :error="errors.email" />
      <InputTextAuth placeholder="Password" v-model:input="password" inputType="password" :error="errors.password" />
      <input type="hidden" name="credentialId" value="" />
      <div class="form__button">
        <button type="submit" name="login">
          <Spinner v-show="isLoading" />
          <span>Login</span>
        </button>
      </div>
    </form>
  </AuthLayout>
</template>

<style lang="scss" scoped>
#stars {
  position: absolute;
  width: 1px;
  height: 1px;
  background: rgba(0, 0, 0, 0);
  box-shadow: 225px 231px #fff, 211px 899px #fff, 1639px 1396px #fff, 1396px 492px #fff, 1945px 255px #fff,
    755px 1544px #fff, 1298px 432px #fff, 1107px 1270px #fff, 233px 1901px #fff, 215px 1128px #fff, 248px 452px #fff,
    84px 1198px #fff, 1741px 991px #fff, 803px 659px #fff, 1988px 1749px #fff, 1136px 267px #fff, 1528px 929px #fff,
    12px 206px #fff, 1074px 1543px #fff, 1631px 1345px #fff, 661px 696px #fff, 1873px 190px #fff, 867px 31px #fff,
    200px 95px #fff, 418px 1416px #fff, 174px 851px #fff, 1440px 427px #fff, 702px 1517px #fff, 1450px 542px #fff,
    311px 1784px #fff, 1687px 1057px #fff, 188px 1495px #fff, 1946px 1948px #fff, 1328px 1795px #fff, 267px 609px #fff,
    377px 917px #fff, 1659px 1478px #fff, 30px 1930px #fff, 236px 811px #fff, 3px 1002px #fff, 906px 1034px #fff,
    629px 323px #fff, 23px 9px #fff, 1579px 190px #fff, 1507px 1069px #fff, 1131px 1770px #fff, 169px 1285px #fff,
    774px 1631px #fff, 1135px 477px #fff, 903px 970px #fff, 1817px 256px #fff, 1919px 63px #fff, 12px 622px #fff,
    979px 1438px #fff, 379px 273px #fff, 433px 1736px #fff, 104px 459px #fff, 1379px 600px #fff, 1759px 475px #fff,
    670px 159px #fff, 468px 397px #fff, 1014px 1972px #fff, 1393px 295px #fff, 1656px 1126px #fff, 473px 1497px #fff,
    1297px 1160px #fff, 218px 922px #fff, 1306px 560px #fff, 614px 185px #fff, 1033px 552px #fff, 1657px 20px #fff,
    643px 1709px #fff, 1606px 681px #fff, 169px 798px #fff, 251px 1598px #fff, 1299px 399px #fff, 889px 1885px #fff,
    748px 782px #fff, 785px 81px #fff, 1805px 976px #fff, 1801px 1951px #fff, 1105px 850px #fff, 182px 1543px #fff,
    680px 1717px #fff, 1012px 1733px #fff, 1385px 1605px #fff, 108px 1686px #fff, 901px 716px #fff, 54px 264px #fff,
    908px 702px #fff, 967px 93px #fff, 1851px 623px #fff, 1759px 1059px #fff, 640px 390px #fff, 1303px 805px #fff,
    247px 1007px #fff, 1904px 1653px #fff, 182px 708px #fff, 1031px 1746px #fff, 1497px 835px #fff, 973px 683px #fff,
    1558px 437px #fff, 1792px 168px #fff, 1765px 1445px #fff, 1673px 1118px #fff, 1120px 533px #fff, 1352px 1331px #fff,
    447px 1650px #fff, 1617px 1769px #fff, 1034px 195px #fff, 696px 260px #fff, 219px 1120px #fff, 1447px 1350px #fff,
    609px 1733px #fff, 836px 260px #fff, 1166px 1730px #fff, 30px 1505px #fff, 662px 486px #fff, 993px 1283px #fff,
    1554px 486px #fff, 865px 160px #fff, 1678px 1274px #fff, 319px 1030px #fff, 1652px 1553px #fff, 1447px 610px #fff,
    1559px 1826px #fff, 480px 930px #fff, 1588px 442px #fff, 1221px 37px #fff, 1112px 1065px #fff, 253px 223px #fff,
    1845px 345px #fff, 561px 859px #fff, 1959px 649px #fff, 316px 965px #fff, 1481px 1505px #fff, 487px 710px #fff,
    131px 1902px #fff, 1086px 1536px #fff, 550px 1128px #fff, 183px 1084px #fff, 252px 899px #fff, 1366px 1124px #fff,
    920px 982px #fff, 442px 553px #fff, 436px 647px #fff, 945px 1752px #fff, 1042px 279px #fff, 493px 866px #fff,
    1252px 558px #fff, 1824px 11px #fff, 281px 1766px #fff, 562px 979px #fff, 39px 480px #fff, 709px 201px #fff,
    1695px 1356px #fff, 1770px 194px #fff, 504px 848px #fff, 790px 269px #fff, 358px 573px #fff, 125px 1213px #fff,
    1565px 258px #fff, 1173px 1980px #fff, 545px 931px #fff, 1709px 1586px #fff, 1638px 678px #fff, 1940px 1094px #fff,
    22px 764px #fff, 245px 1495px #fff, 338px 286px #fff, 1604px 498px #fff, 1388px 170px #fff, 866px 1330px #fff,
    1450px 1951px #fff, 1991px 530px #fff, 1386px 449px #fff, 946px 488px #fff, 921px 1924px #fff, 1127px 536px #fff,
    582px 338px #fff, 752px 1038px #fff, 611px 1550px #fff, 1981px 698px #fff, 49px 400px #fff, 244px 1120px #fff,
    1906px 1831px #fff, 1857px 1575px #fff, 1238px 212px #fff, 1217px 1682px #fff, 394px 731px #fff, 761px 1572px #fff,
    1134px 278px #fff, 1541px 236px #fff, 1853px 852px #fff, 1514px 1506px #fff, 1556px 239px #fff, 1305px 1173px #fff,
    541px 689px #fff, 1339px 882px #fff, 1778px 730px #fff, 1373px 1476px #fff, 1714px 468px #fff, 666px 1322px #fff,
    86px 1675px #fff, 1167px 1029px #fff, 1493px 1405px #fff, 1339px 713px #fff, 1621px 996px #fff, 1838px 1627px #fff,
    171px 1092px #fff, 727px 1612px #fff, 1567px 117px #fff, 1037px 1085px #fff, 725px 1714px #fff, 1625px 1076px #fff,
    1128px 1540px #fff, 553px 741px #fff, 447px 296px #fff, 1824px 132px #fff, 1899px 1525px #fff, 701px 1736px #fff,
    1477px 37px #fff, 394px 271px #fff, 972px 1448px #fff, 1173px 1297px #fff, 44px 852px #fff, 677px 638px #fff,
    210px 775px #fff, 1289px 1493px #fff, 1294px 493px #fff, 1171px 1580px #fff, 145px 1199px #fff, 309px 1515px #fff,
    1887px 1117px #fff, 1861px 193px #fff, 303px 689px #fff, 588px 478px #fff, 182px 1718px #fff, 235px 602px #fff,
    1745px 481px #fff, 187px 1084px #fff, 823px 244px #fff, 264px 673px #fff, 1062px 594px #fff, 1280px 1258px #fff,
    835px 527px #fff, 1738px 1939px #fff, 602px 1715px #fff, 1644px 864px #fff, 433px 192px #fff, 1576px 191px #fff,
    499px 1423px #fff, 983px 484px #fff, 962px 1532px #fff, 573px 751px #fff, 1040px 1392px #fff, 1276px 1211px #fff,
    1033px 929px #fff, 1354px 1883px #fff, 147px 162px #fff, 117px 783px #fff, 633px 1863px #fff, 853px 466px #fff,
    892px 399px #fff, 1818px 760px #fff, 563px 1808px #fff, 569px 807px #fff, 309px 670px #fff, 1790px 427px #fff,
    1261px 258px #fff, 649px 1259px #fff, 297px 1078px #fff, 40px 1238px #fff, 1474px 678px #fff, 423px 777px #fff,
    1793px 405px #fff, 462px 1219px #fff, 664px 472px #fff, 477px 1601px #fff, 708px 1694px #fff, 1476px 1581px #fff,
    1547px 554px #fff, 1233px 242px #fff, 1236px 1780px #fff, 1865px 1351px #fff, 622px 1306px #fff, 900px 1386px #fff,
    701px 563px #fff, 1392px 1877px #fff, 750px 896px #fff, 1682px 1612px #fff, 1578px 489px #fff, 3px 1690px #fff,
    576px 44px #fff, 853px 366px #fff, 905px 554px #fff, 1909px 82px #fff, 895px 1980px #fff, 1644px 19px #fff,
    1398px 1586px #fff, 932px 379px #fff, 78px 491px #fff, 1117px 108px #fff, 1161px 215px #fff, 581px 49px #fff,
    489px 46px #fff, 731px 837px #fff, 1258px 715px #fff, 971px 444px #fff, 416px 1333px #fff, 490px 1253px #fff,
    166px 3px #fff, 132px 1597px #fff, 1575px 1456px #fff, 1009px 1862px #fff, 1310px 785px #fff, 1020px 1648px #fff,
    103px 1019px #fff, 968px 612px #fff, 1700px 1733px #fff, 1598px 230px #fff, 1909px 1128px #fff, 966px 1181px #fff,
    245px 369px #fff, 1790px 153px #fff, 1124px 1184px #fff, 1733px 671px #fff, 613px 1704px #fff, 1871px 320px #fff,
    1773px 1915px #fff, 252px 487px #fff, 776px 741px #fff, 1024px 1421px #fff, 874px 403px #fff, 1889px 607px #fff,
    547px 1934px #fff, 916px 1820px #fff, 731px 1925px #fff, 1401px 246px #fff, 247px 1979px #fff, 1191px 54px #fff,
    367px 1509px #fff, 932px 80px #fff, 94px 852px #fff, 1865px 1588px #fff, 755px 20px #fff, 376px 1342px #fff,
    1935px 1443px #fff, 632px 1885px #fff, 1590px 565px #fff, 1643px 270px #fff, 287px 1730px #fff, 1893px 1599px #fff,
    992px 856px #fff, 1723px 1748px #fff, 36px 1745px #fff, 213px 1694px #fff, 1418px 1514px #fff, 1010px 935px #fff,
    929px 1128px #fff, 1381px 1014px #fff, 474px 103px #fff, 1817px 216px #fff, 930px 1782px #fff, 529px 1814px #fff,
    531px 527px #fff, 1477px 621px #fff, 1142px 1865px #fff, 1880px 1145px #fff, 867px 1279px #fff, 296px 937px #fff,
    1283px 761px #fff, 1390px 1885px #fff, 1577px 655px #fff, 1403px 1717px #fff, 1273px 1202px #fff, 1723px 121px #fff,
    1135px 1288px #fff, 57px 1724px #fff, 1868px 653px #fff, 439px 1436px #fff, 1311px 1955px #fff, 557px 777px #fff,
    1015px 1476px #fff, 1668px 1074px #fff, 43px 432px #fff, 1778px 991px #fff, 675px 1137px #fff, 875px 1933px #fff,
    279px 1327px #fff, 1915px 1834px #fff, 336px 117px #fff, 1422px 1704px #fff, 405px 1918px #fff, 30px 1766px #fff,
    189px 1767px #fff, 1942px 1702px #fff, 953px 1526px #fff, 1509px 367px #fff, 893px 302px #fff, 1697px 1757px #fff,
    19px 1233px #fff, 261px 665px #fff, 257px 740px #fff, 79px 675px #fff, 383px 981px #fff, 1033px 741px #fff,
    1320px 959px #fff, 744px 1464px #fff, 923px 1395px #fff, 1097px 294px #fff, 1124px 1372px #fff, 1065px 847px #fff,
    590px 1016px #fff, 1237px 1956px #fff, 984px 1285px #fff, 489px 949px #fff, 1054px 1980px #fff, 6px 1210px #fff,
    105px 1747px #fff, 1720px 1282px #fff, 1096px 1749px #fff, 1917px 1721px #fff, 915px 79px #fff, 729px 1157px #fff,
    652px 1674px #fff, 1309px 797px #fff, 674px 1415px #fff, 1844px 514px #fff, 1521px 192px #fff, 884px 556px #fff,
    1492px 1231px #fff, 1862px 1972px #fff, 1067px 1612px #fff, 314px 128px #fff, 488px 819px #fff, 1570px 1775px #fff,
    326px 265px #fff, 71px 1460px #fff, 1487px 568px #fff, 625px 1999px #fff, 1728px 897px #fff, 613px 1348px #fff,
    194px 17px #fff, 259px 612px #fff, 1628px 589px #fff, 1276px 197px #fff, 1722px 22px #fff, 141px 1583px #fff,
    183px 759px #fff, 1920px 1950px #fff, 209px 1344px #fff, 1313px 1317px #fff, 216px 344px #fff, 893px 584px #fff,
    778px 796px #fff, 764px 1390px #fff, 929px 927px #fff, 642px 1663px #fff, 762px 1635px #fff, 1084px 922px #fff,
    1373px 1351px #fff, 1747px 1705px #fff, 1697px 558px #fff, 790px 1px #fff, 383px 703px #fff, 1222px 241px #fff,
    1553px 517px #fff, 1834px 1825px #fff, 1767px 790px #fff, 737px 1038px #fff, 1401px 725px #fff, 913px 645px #fff,
    670px 775px #fff, 320px 1976px #fff, 682px 982px #fff, 998px 1576px #fff, 854px 297px #fff, 1289px 1712px #fff,
    1303px 1015px #fff, 1111px 1777px #fff, 319px 20px #fff, 1015px 1736px #fff, 569px 1900px #fff, 1664px 1444px #fff,
    1809px 1898px #fff, 818px 1595px #fff, 416px 1287px #fff, 1149px 644px #fff, 829px 1289px #fff, 1285px 1905px #fff,
    1040px 261px #fff, 120px 634px #fff, 690px 1319px #fff, 1200px 938px #fff, 1561px 1593px #fff, 1645px 893px #fff,
    1873px 1476px #fff, 576px 716px #fff, 1176px 355px #fff, 1700px 558px #fff, 590px 1962px #fff, 1842px 572px #fff,
    836px 1843px #fff, 1984px 54px #fff, 1909px 717px #fff, 264px 1069px #fff, 27px 1208px #fff, 162px 317px #fff,
    1720px 1047px #fff, 579px 529px #fff, 482px 1646px #fff, 256px 1666px #fff, 232px 1119px #fff, 1554px 1140px #fff,
    1574px 1126px #fff, 1565px 725px #fff, 1715px 1107px #fff, 473px 978px #fff, 1278px 1210px #fff, 1288px 1214px #fff,
    1912px 1264px #fff, 152px 798px #fff, 1681px 1565px #fff, 1107px 244px #fff, 767px 598px #fff, 354px 1762px #fff,
    1735px 998px #fff, 690px 1289px #fff, 1965px 382px #fff, 1551px 1552px #fff, 250px 390px #fff, 1202px 1325px #fff,
    1762px 1773px #fff, 846px 1037px #fff, 331px 1734px #fff, 1644px 503px #fff, 1508px 504px #fff, 174px 300px #fff,
    948px 1540px #fff, 1855px 741px #fff, 2px 136px #fff, 1078px 1841px #fff, 904px 241px #fff, 732px 1190px #fff,
    1981px 1182px #fff, 235px 866px #fff, 593px 764px #fff, 1593px 1674px #fff, 469px 675px #fff, 1801px 759px #fff,
    337px 454px #fff, 870px 1544px #fff, 1934px 929px #fff, 1413px 499px #fff, 1026px 1982px #fff, 955px 1554px #fff,
    1066px 1485px #fff, 1152px 1369px #fff, 193px 566px #fff, 1084px 173px #fff, 795px 661px #fff, 244px 251px #fff,
    1459px 181px #fff, 192px 715px #fff, 1705px 1327px #fff, 1405px 588px #fff, 823px 1664px #fff, 1703px 434px #fff,
    1475px 30px #fff, 480px 202px #fff, 816px 651px #fff, 1188px 624px #fff, 240px 447px #fff, 1509px 1706px #fff,
    1843px 5px #fff, 723px 989px #fff, 1014px 706px #fff, 1875px 1790px #fff, 823px 1748px #fff, 718px 1493px #fff,
    493px 1798px #fff, 135px 819px #fff, 1789px 361px #fff, 1854px 566px #fff, 1623px 1848px #fff, 22px 1581px #fff,
    1040px 1793px #fff, 1434px 681px #fff, 1245px 1622px #fff, 1155px 498px #fff, 1372px 1869px #fff, 1909px 540px #fff,
    1877px 1121px #fff, 1710px 1532px #fff, 478px 1732px #fff, 291px 644px #fff, 1866px 1960px #fff, 170px 867px #fff,
    101px 696px #fff, 1500px 1721px #fff, 277px 1393px #fff, 1021px 1603px #fff, 1343px 1202px #fff, 389px 291px #fff,
    342px 1998px #fff, 1788px 547px #fff, 1735px 1324px #fff, 1854px 346px #fff, 1474px 554px #fff, 961px 527px #fff,
    1325px 1034px #fff, 277px 100px #fff, 1212px 1855px #fff, 499px 1629px #fff, 1401px 323px #fff, 1233px 577px #fff,
    1810px 685px #fff, 1094px 657px #fff, 711px 1750px #fff, 1504px 1364px #fff, 1874px 1556px #fff, 588px 614px #fff,
    1849px 795px #fff, 1570px 1694px #fff, 672px 890px #fff, 1442px 1973px #fff, 467px 992px #fff, 351px 197px #fff,
    1474px 147px #fff, 1753px 1660px #fff, 15px 642px #fff, 471px 1161px #fff, 1261px 850px #fff, 999px 272px #fff,
    289px 729px #fff, 357px 1425px #fff, 1238px 1945px #fff, 1503px 230px #fff, 1564px 129px #fff, 821px 1474px #fff,
    90px 740px #fff, 278px 1055px #fff, 491px 937px #fff, 261px 1978px #fff, 1356px 1778px #fff, 1853px 1662px #fff,
    1408px 995px #fff, 722px 1035px #fff, 106px 679px #fff, 571px 1468px #fff, 1654px 761px #fff, 1428px 1586px #fff,
    1348px 1005px #fff, 867px 1854px #fff, 884px 1352px #fff, 1374px 275px #fff, 480px 388px #fff, 1747px 1647px #fff,
    1164px 1407px #fff, 1612px 1238px #fff, 977px 1278px #fff, 696px 1705px #fff, 203px 786px #fff, 1584px 1397px #fff,
    416px 1151px #fff, 52px 490px #fff, 746px 63px #fff, 40px 1766px #fff, 431px 630px #fff, 1699px 964px #fff,
    621px 950px #fff, 1341px 143px #fff, 12px 536px #fff, 1366px 1095px #fff, 542px 1988px #fff, 666px 743px #fff,
    1195px 475px #fff, 114px 281px #fff, 1188px 353px #fff, 58px 1800px #fff, 1187px 1606px #fff, 1270px 1297px #fff,
    877px 57px #fff, 1147px 364px #fff, 1595px 1527px #fff, 78px 689px #fff, 790px 901px #fff, 45px 456px #fff,
    1052px 106px #fff, 705px 6px #fff, 956px 1006px #fff, 882px 1782px #fff, 1237px 1037px #fff, 9px 281px #fff,
    1321px 1327px #fff, 1399px 131px #fff, 689px 124px #fff, 667px 1162px #fff, 1086px 1785px #fff;
  animation: animStar 50s linear infinite;
  opacity: 0.5;

  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: rgba(0, 0, 0, 0);
    box-shadow: 225px 231px #fff, 211px 899px #fff, 1639px 1396px #fff, 1396px 492px #fff, 1945px 255px #fff,
      755px 1544px #fff, 1298px 432px #fff, 1107px 1270px #fff, 233px 1901px #fff, 215px 1128px #fff, 248px 452px #fff,
      84px 1198px #fff, 1741px 991px #fff, 803px 659px #fff, 1988px 1749px #fff, 1136px 267px #fff, 1528px 929px #fff,
      12px 206px #fff, 1074px 1543px #fff, 1631px 1345px #fff, 661px 696px #fff, 1873px 190px #fff, 867px 31px #fff,
      200px 95px #fff, 418px 1416px #fff, 174px 851px #fff, 1440px 427px #fff, 702px 1517px #fff, 1450px 542px #fff,
      311px 1784px #fff, 1687px 1057px #fff, 188px 1495px #fff, 1946px 1948px #fff, 1328px 1795px #fff, 267px 609px #fff,
      377px 917px #fff, 1659px 1478px #fff, 30px 1930px #fff, 236px 811px #fff, 3px 1002px #fff, 906px 1034px #fff,
      629px 323px #fff, 23px 9px #fff, 1579px 190px #fff, 1507px 1069px #fff, 1131px 1770px #fff, 169px 1285px #fff,
      774px 1631px #fff, 1135px 477px #fff, 903px 970px #fff, 1817px 256px #fff, 1919px 63px #fff, 12px 622px #fff,
      979px 1438px #fff, 379px 273px #fff, 433px 1736px #fff, 104px 459px #fff, 1379px 600px #fff, 1759px 475px #fff,
      670px 159px #fff, 468px 397px #fff, 1014px 1972px #fff, 1393px 295px #fff, 1656px 1126px #fff, 473px 1497px #fff,
      1297px 1160px #fff, 218px 922px #fff, 1306px 560px #fff, 614px 185px #fff, 1033px 552px #fff, 1657px 20px #fff,
      643px 1709px #fff, 1606px 681px #fff, 169px 798px #fff, 251px 1598px #fff, 1299px 399px #fff, 889px 1885px #fff,
      748px 782px #fff, 785px 81px #fff, 1805px 976px #fff, 1801px 1951px #fff, 1105px 850px #fff, 182px 1543px #fff,
      680px 1717px #fff, 1012px 1733px #fff, 1385px 1605px #fff, 108px 1686px #fff, 901px 716px #fff, 54px 264px #fff,
      908px 702px #fff, 967px 93px #fff, 1851px 623px #fff, 1759px 1059px #fff, 640px 390px #fff, 1303px 805px #fff,
      247px 1007px #fff, 1904px 1653px #fff, 182px 708px #fff, 1031px 1746px #fff, 1497px 835px #fff, 973px 683px #fff,
      1558px 437px #fff, 1792px 168px #fff, 1765px 1445px #fff, 1673px 1118px #fff, 1120px 533px #fff,
      1352px 1331px #fff, 447px 1650px #fff, 1617px 1769px #fff, 1034px 195px #fff, 696px 260px #fff, 219px 1120px #fff,
      1447px 1350px #fff, 609px 1733px #fff, 836px 260px #fff, 1166px 1730px #fff, 30px 1505px #fff, 662px 486px #fff,
      993px 1283px #fff, 1554px 486px #fff, 865px 160px #fff, 1678px 1274px #fff, 319px 1030px #fff, 1652px 1553px #fff,
      1447px 610px #fff, 1559px 1826px #fff, 480px 930px #fff, 1588px 442px #fff, 1221px 37px #fff, 1112px 1065px #fff,
      253px 223px #fff, 1845px 345px #fff, 561px 859px #fff, 1959px 649px #fff, 316px 965px #fff, 1481px 1505px #fff,
      487px 710px #fff, 131px 1902px #fff, 1086px 1536px #fff, 550px 1128px #fff, 183px 1084px #fff, 252px 899px #fff,
      1366px 1124px #fff, 920px 982px #fff, 442px 553px #fff, 436px 647px #fff, 945px 1752px #fff, 1042px 279px #fff,
      493px 866px #fff, 1252px 558px #fff, 1824px 11px #fff, 281px 1766px #fff, 562px 979px #fff, 39px 480px #fff,
      709px 201px #fff, 1695px 1356px #fff, 1770px 194px #fff, 504px 848px #fff, 790px 269px #fff, 358px 573px #fff,
      125px 1213px #fff, 1565px 258px #fff, 1173px 1980px #fff, 545px 931px #fff, 1709px 1586px #fff, 1638px 678px #fff,
      1940px 1094px #fff, 22px 764px #fff, 245px 1495px #fff, 338px 286px #fff, 1604px 498px #fff, 1388px 170px #fff,
      866px 1330px #fff, 1450px 1951px #fff, 1991px 530px #fff, 1386px 449px #fff, 946px 488px #fff, 921px 1924px #fff,
      1127px 536px #fff, 582px 338px #fff, 752px 1038px #fff, 611px 1550px #fff, 1981px 698px #fff, 49px 400px #fff,
      244px 1120px #fff, 1906px 1831px #fff, 1857px 1575px #fff, 1238px 212px #fff, 1217px 1682px #fff, 394px 731px #fff,
      761px 1572px #fff, 1134px 278px #fff, 1541px 236px #fff, 1853px 852px #fff, 1514px 1506px #fff, 1556px 239px #fff,
      1305px 1173px #fff, 541px 689px #fff, 1339px 882px #fff, 1778px 730px #fff, 1373px 1476px #fff, 1714px 468px #fff,
      666px 1322px #fff, 86px 1675px #fff, 1167px 1029px #fff, 1493px 1405px #fff, 1339px 713px #fff, 1621px 996px #fff,
      1838px 1627px #fff, 171px 1092px #fff, 727px 1612px #fff, 1567px 117px #fff, 1037px 1085px #fff, 725px 1714px #fff,
      1625px 1076px #fff, 1128px 1540px #fff, 553px 741px #fff, 447px 296px #fff, 1824px 132px #fff, 1899px 1525px #fff,
      701px 1736px #fff, 1477px 37px #fff, 394px 271px #fff, 972px 1448px #fff, 1173px 1297px #fff, 44px 852px #fff,
      677px 638px #fff, 210px 775px #fff, 1289px 1493px #fff, 1294px 493px #fff, 1171px 1580px #fff, 145px 1199px #fff,
      309px 1515px #fff, 1887px 1117px #fff, 1861px 193px #fff, 303px 689px #fff, 588px 478px #fff, 182px 1718px #fff,
      235px 602px #fff, 1745px 481px #fff, 187px 1084px #fff, 823px 244px #fff, 264px 673px #fff, 1062px 594px #fff,
      1280px 1258px #fff, 835px 527px #fff, 1738px 1939px #fff, 602px 1715px #fff, 1644px 864px #fff, 433px 192px #fff,
      1576px 191px #fff, 499px 1423px #fff, 983px 484px #fff, 962px 1532px #fff, 573px 751px #fff, 1040px 1392px #fff,
      1276px 1211px #fff, 1033px 929px #fff, 1354px 1883px #fff, 147px 162px #fff, 117px 783px #fff, 633px 1863px #fff,
      853px 466px #fff, 892px 399px #fff, 1818px 760px #fff, 563px 1808px #fff, 569px 807px #fff, 309px 670px #fff,
      1790px 427px #fff, 1261px 258px #fff, 649px 1259px #fff, 297px 1078px #fff, 40px 1238px #fff, 1474px 678px #fff,
      423px 777px #fff, 1793px 405px #fff, 462px 1219px #fff, 664px 472px #fff, 477px 1601px #fff, 708px 1694px #fff,
      1476px 1581px #fff, 1547px 554px #fff, 1233px 242px #fff, 1236px 1780px #fff, 1865px 1351px #fff,
      622px 1306px #fff, 900px 1386px #fff, 701px 563px #fff, 1392px 1877px #fff, 750px 896px #fff, 1682px 1612px #fff,
      1578px 489px #fff, 3px 1690px #fff, 576px 44px #fff, 853px 366px #fff, 905px 554px #fff, 1909px 82px #fff,
      895px 1980px #fff, 1644px 19px #fff, 1398px 1586px #fff, 932px 379px #fff, 78px 491px #fff, 1117px 108px #fff,
      1161px 215px #fff, 581px 49px #fff, 489px 46px #fff, 731px 837px #fff, 1258px 715px #fff, 971px 444px #fff,
      416px 1333px #fff, 490px 1253px #fff, 166px 3px #fff, 132px 1597px #fff, 1575px 1456px #fff, 1009px 1862px #fff,
      1310px 785px #fff, 1020px 1648px #fff, 103px 1019px #fff, 968px 612px #fff, 1700px 1733px #fff, 1598px 230px #fff,
      1909px 1128px #fff, 966px 1181px #fff, 245px 369px #fff, 1790px 153px #fff, 1124px 1184px #fff, 1733px 671px #fff,
      613px 1704px #fff, 1871px 320px #fff, 1773px 1915px #fff, 252px 487px #fff, 776px 741px #fff, 1024px 1421px #fff,
      874px 403px #fff, 1889px 607px #fff, 547px 1934px #fff, 916px 1820px #fff, 731px 1925px #fff, 1401px 246px #fff,
      247px 1979px #fff, 1191px 54px #fff, 367px 1509px #fff, 932px 80px #fff, 94px 852px #fff, 1865px 1588px #fff,
      755px 20px #fff, 376px 1342px #fff, 1935px 1443px #fff, 632px 1885px #fff, 1590px 565px #fff, 1643px 270px #fff,
      287px 1730px #fff, 1893px 1599px #fff, 992px 856px #fff, 1723px 1748px #fff, 36px 1745px #fff, 213px 1694px #fff,
      1418px 1514px #fff, 1010px 935px #fff, 929px 1128px #fff, 1381px 1014px #fff, 474px 103px #fff, 1817px 216px #fff,
      930px 1782px #fff, 529px 1814px #fff, 531px 527px #fff, 1477px 621px #fff, 1142px 1865px #fff, 1880px 1145px #fff,
      867px 1279px #fff, 296px 937px #fff, 1283px 761px #fff, 1390px 1885px #fff, 1577px 655px #fff, 1403px 1717px #fff,
      1273px 1202px #fff, 1723px 121px #fff, 1135px 1288px #fff, 57px 1724px #fff, 1868px 653px #fff, 439px 1436px #fff,
      1311px 1955px #fff, 557px 777px #fff, 1015px 1476px #fff, 1668px 1074px #fff, 43px 432px #fff, 1778px 991px #fff,
      675px 1137px #fff, 875px 1933px #fff, 279px 1327px #fff, 1915px 1834px #fff, 336px 117px #fff, 1422px 1704px #fff,
      405px 1918px #fff, 30px 1766px #fff, 189px 1767px #fff, 1942px 1702px #fff, 953px 1526px #fff, 1509px 367px #fff,
      893px 302px #fff, 1697px 1757px #fff, 19px 1233px #fff, 261px 665px #fff, 257px 740px #fff, 79px 675px #fff,
      383px 981px #fff, 1033px 741px #fff, 1320px 959px #fff, 744px 1464px #fff, 923px 1395px #fff, 1097px 294px #fff,
      1124px 1372px #fff, 1065px 847px #fff, 590px 1016px #fff, 1237px 1956px #fff, 984px 1285px #fff, 489px 949px #fff,
      1054px 1980px #fff, 6px 1210px #fff, 105px 1747px #fff, 1720px 1282px #fff, 1096px 1749px #fff, 1917px 1721px #fff,
      915px 79px #fff, 729px 1157px #fff, 652px 1674px #fff, 1309px 797px #fff, 674px 1415px #fff, 1844px 514px #fff,
      1521px 192px #fff, 884px 556px #fff, 1492px 1231px #fff, 1862px 1972px #fff, 1067px 1612px #fff, 314px 128px #fff,
      488px 819px #fff, 1570px 1775px #fff, 326px 265px #fff, 71px 1460px #fff, 1487px 568px #fff, 625px 1999px #fff,
      1728px 897px #fff, 613px 1348px #fff, 194px 17px #fff, 259px 612px #fff, 1628px 589px #fff, 1276px 197px #fff,
      1722px 22px #fff, 141px 1583px #fff, 183px 759px #fff, 1920px 1950px #fff, 209px 1344px #fff, 1313px 1317px #fff,
      216px 344px #fff, 893px 584px #fff, 778px 796px #fff, 764px 1390px #fff, 929px 927px #fff, 642px 1663px #fff,
      762px 1635px #fff, 1084px 922px #fff, 1373px 1351px #fff, 1747px 1705px #fff, 1697px 558px #fff, 790px 1px #fff,
      383px 703px #fff, 1222px 241px #fff, 1553px 517px #fff, 1834px 1825px #fff, 1767px 790px #fff, 737px 1038px #fff,
      1401px 725px #fff, 913px 645px #fff, 670px 775px #fff, 320px 1976px #fff, 682px 982px #fff, 998px 1576px #fff,
      854px 297px #fff, 1289px 1712px #fff, 1303px 1015px #fff, 1111px 1777px #fff, 319px 20px #fff, 1015px 1736px #fff,
      569px 1900px #fff, 1664px 1444px #fff, 1809px 1898px #fff, 818px 1595px #fff, 416px 1287px #fff, 1149px 644px #fff,
      829px 1289px #fff, 1285px 1905px #fff, 1040px 261px #fff, 120px 634px #fff, 690px 1319px #fff, 1200px 938px #fff,
      1561px 1593px #fff, 1645px 893px #fff, 1873px 1476px #fff, 576px 716px #fff, 1176px 355px #fff, 1700px 558px #fff,
      590px 1962px #fff, 1842px 572px #fff, 836px 1843px #fff, 1984px 54px #fff, 1909px 717px #fff, 264px 1069px #fff,
      27px 1208px #fff, 162px 317px #fff, 1720px 1047px #fff, 579px 529px #fff, 482px 1646px #fff, 256px 1666px #fff,
      232px 1119px #fff, 1554px 1140px #fff, 1574px 1126px #fff, 1565px 725px #fff, 1715px 1107px #fff, 473px 978px #fff,
      1278px 1210px #fff, 1288px 1214px #fff, 1912px 1264px #fff, 152px 798px #fff, 1681px 1565px #fff,
      1107px 244px #fff, 767px 598px #fff, 354px 1762px #fff, 1735px 998px #fff, 690px 1289px #fff, 1965px 382px #fff,
      1551px 1552px #fff, 250px 390px #fff, 1202px 1325px #fff, 1762px 1773px #fff, 846px 1037px #fff, 331px 1734px #fff,
      1644px 503px #fff, 1508px 504px #fff, 174px 300px #fff, 948px 1540px #fff, 1855px 741px #fff, 2px 136px #fff,
      1078px 1841px #fff, 904px 241px #fff, 732px 1190px #fff, 1981px 1182px #fff, 235px 866px #fff, 593px 764px #fff,
      1593px 1674px #fff, 469px 675px #fff, 1801px 759px #fff, 337px 454px #fff, 870px 1544px #fff, 1934px 929px #fff,
      1413px 499px #fff, 1026px 1982px #fff, 955px 1554px #fff, 1066px 1485px #fff, 1152px 1369px #fff, 193px 566px #fff,
      1084px 173px #fff, 795px 661px #fff, 244px 251px #fff, 1459px 181px #fff, 192px 715px #fff, 1705px 1327px #fff,
      1405px 588px #fff, 823px 1664px #fff, 1703px 434px #fff, 1475px 30px #fff, 480px 202px #fff, 816px 651px #fff,
      1188px 624px #fff, 240px 447px #fff, 1509px 1706px #fff, 1843px 5px #fff, 723px 989px #fff, 1014px 706px #fff,
      1875px 1790px #fff, 823px 1748px #fff, 718px 1493px #fff, 493px 1798px #fff, 135px 819px #fff, 1789px 361px #fff,
      1854px 566px #fff, 1623px 1848px #fff, 22px 1581px #fff, 1040px 1793px #fff, 1434px 681px #fff, 1245px 1622px #fff,
      1155px 498px #fff, 1372px 1869px #fff, 1909px 540px #fff, 1877px 1121px #fff, 1710px 1532px #fff,
      478px 1732px #fff, 291px 644px #fff, 1866px 1960px #fff, 170px 867px #fff, 101px 696px #fff, 1500px 1721px #fff,
      277px 1393px #fff, 1021px 1603px #fff, 1343px 1202px #fff, 389px 291px #fff, 342px 1998px #fff, 1788px 547px #fff,
      1735px 1324px #fff, 1854px 346px #fff, 1474px 554px #fff, 961px 527px #fff, 1325px 1034px #fff, 277px 100px #fff,
      1212px 1855px #fff, 499px 1629px #fff, 1401px 323px #fff, 1233px 577px #fff, 1810px 685px #fff, 1094px 657px #fff,
      711px 1750px #fff, 1504px 1364px #fff, 1874px 1556px #fff, 588px 614px #fff, 1849px 795px #fff, 1570px 1694px #fff,
      672px 890px #fff, 1442px 1973px #fff, 467px 992px #fff, 351px 197px #fff, 1474px 147px #fff, 1753px 1660px #fff,
      15px 642px #fff, 471px 1161px #fff, 1261px 850px #fff, 999px 272px #fff, 289px 729px #fff, 357px 1425px #fff,
      1238px 1945px #fff, 1503px 230px #fff, 1564px 129px #fff, 821px 1474px #fff, 90px 740px #fff, 278px 1055px #fff,
      491px 937px #fff, 261px 1978px #fff, 1356px 1778px #fff, 1853px 1662px #fff, 1408px 995px #fff, 722px 1035px #fff,
      106px 679px #fff, 571px 1468px #fff, 1654px 761px #fff, 1428px 1586px #fff, 1348px 1005px #fff, 867px 1854px #fff,
      884px 1352px #fff, 1374px 275px #fff, 480px 388px #fff, 1747px 1647px #fff, 1164px 1407px #fff, 1612px 1238px #fff,
      977px 1278px #fff, 696px 1705px #fff, 203px 786px #fff, 1584px 1397px #fff, 416px 1151px #fff, 52px 490px #fff,
      746px 63px #fff, 40px 1766px #fff, 431px 630px #fff, 1699px 964px #fff, 621px 950px #fff, 1341px 143px #fff,
      12px 536px #fff, 1366px 1095px #fff, 542px 1988px #fff, 666px 743px #fff, 1195px 475px #fff, 114px 281px #fff,
      1188px 353px #fff, 58px 1800px #fff, 1187px 1606px #fff, 1270px 1297px #fff, 877px 57px #fff, 1147px 364px #fff,
      1595px 1527px #fff, 78px 689px #fff, 790px 901px #fff, 45px 456px #fff, 1052px 106px #fff, 705px 6px #fff,
      956px 1006px #fff, 882px 1782px #fff, 1237px 1037px #fff, 9px 281px #fff, 1321px 1327px #fff, 1399px 131px #fff,
      689px 124px #fff, 667px 1162px #fff, 1086px 1785px #fff;
  }
}

#stars2 {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(0, 0, 0, 0);
  box-shadow: 1490px 1137px #fff, 1750px 1970px #fff, 1499px 722px #fff, 159px 164px #fff, 1433px 1437px #fff,
    1383px 737px #fff, 890px 1354px #fff, 1736px 1461px #fff, 23px 981px #fff, 433px 782px #fff, 1531px 719px #fff,
    1869px 1730px #fff, 1259px 600px #fff, 379px 1545px #fff, 243px 1244px #fff, 292px 1981px #fff, 626px 1377px #fff,
    1350px 1312px #fff, 1138px 1682px #fff, 1895px 766px #fff, 1656px 987px #fff, 431px 406px #fff, 1133px 254px #fff,
    947px 298px #fff, 1185px 1666px #fff, 1677px 1669px #fff, 1252px 578px #fff, 1435px 526px #fff, 1098px 1939px #fff,
    1573px 374px #fff, 1886px 1642px #fff, 904px 120px #fff, 1216px 1293px #fff, 927px 505px #fff, 1946px 1708px #fff,
    364px 1524px #fff, 372px 1516px #fff, 54px 1929px #fff, 1085px 1088px #fff, 671px 1531px #fff, 721px 596px #fff,
    102px 1702px #fff, 1715px 187px #fff, 1715px 1590px #fff, 1723px 1908px #fff, 519px 829px #fff, 1865px 243px #fff,
    1581px 146px #fff, 1568px 1568px #fff, 582px 558px #fff, 1203px 742px #fff, 294px 649px #fff, 1907px 790px #fff,
    1065px 1046px #fff, 1281px 1129px #fff, 991px 959px #fff, 1269px 423px #fff, 1772px 944px #fff, 1847px 342px #fff,
    237px 375px #fff, 1821px 1811px #fff, 207px 328px #fff, 379px 1505px #fff, 218px 1784px #fff, 47px 170px #fff,
    299px 237px #fff, 507px 246px #fff, 312px 1110px #fff, 289px 952px #fff, 1405px 227px #fff, 1365px 709px #fff,
    790px 133px #fff, 1543px 466px #fff, 1784px 386px #fff, 362px 858px #fff, 1690px 1989px #fff, 1048px 566px #fff,
    1059px 1100px #fff, 1690px 1121px #fff, 780px 868px #fff, 204px 448px #fff, 874px 969px #fff, 1414px 1359px #fff,
    309px 1834px #fff, 166px 80px #fff, 110px 1608px #fff, 933px 569px #fff, 1096px 553px #fff, 130px 1014px #fff,
    239px 1780px #fff, 1469px 126px #fff, 714px 1679px #fff, 828px 988px #fff, 416px 337px #fff, 1772px 1803px #fff,
    1802px 732px #fff, 1396px 872px #fff, 947px 560px #fff, 782px 1312px #fff, 88px 758px #fff, 224px 678px #fff,
    842px 863px #fff, 1609px 312px #fff, 1279px 788px #fff, 1801px 1277px #fff, 1859px 1830px #fff, 1875px 22px #fff,
    599px 1429px #fff, 1739px 58px #fff, 1120px 1765px #fff, 1917px 946px #fff, 516px 1438px #fff, 451px 136px #fff,
    914px 1520px #fff, 1627px 311px #fff, 121px 342px #fff, 223px 1359px #fff, 1557px 118px #fff, 981px 811px #fff,
    1540px 105px #fff, 555px 1111px #fff, 666px 487px #fff, 1638px 685px #fff, 576px 134px #fff, 1714px 387px #fff,
    1055px 1745px #fff, 102px 185px #fff, 1605px 427px #fff, 1898px 1800px #fff, 181px 1035px #fff, 1264px 821px #fff,
    1328px 395px #fff, 1246px 68px #fff, 1829px 960px #fff, 914px 403px #fff, 447px 1950px #fff, 1354px 121px #fff,
    741px 907px #fff, 1457px 876px #fff, 1926px 1295px #fff, 1375px 1511px #fff, 877px 1935px #fff, 733px 1184px #fff,
    195px 81px #fff, 1580px 1002px #fff, 1392px 1421px #fff, 122px 1373px #fff, 1100px 1204px #fff, 1294px 340px #fff,
    215px 1569px #fff, 1272px 541px #fff, 448px 128px #fff, 1648px 1702px #fff, 1272px 1608px #fff, 1133px 153px #fff,
    1894px 632px #fff, 1438px 371px #fff, 1872px 1224px #fff, 539px 1889px #fff, 1010px 1330px #fff, 1340px 244px #fff,
    1456px 273px #fff, 1374px 187px #fff, 1842px 382px #fff, 13px 708px #fff, 808px 839px #fff, 846px 1991px #fff,
    1887px 1031px #fff, 695px 476px #fff, 1811px 52px #fff, 690px 230px #fff, 1800px 1203px #fff, 1428px 1894px #fff,
    1758px 499px #fff, 1109px 1340px #fff, 1086px 1832px #fff, 1705px 644px #fff, 1299px 1839px #fff, 139px 1130px #fff,
    612px 832px #fff, 872px 496px #fff, 1061px 1320px #fff, 1609px 421px #fff, 1351px 884px #fff, 192px 917px #fff,
    31px 1972px #fff, 1497px 1135px #fff, 832px 865px #fff, 714px 1806px #fff, 533px 1808px #fff, 1467px 382px #fff,
    1452px 945px #fff, 122px 389px #fff, 1822px 156px #fff, 1530px 7px #fff, 850px 301px #fff, 1330px 528px #fff,
    367px 1086px #fff, 176px 1074px #fff, 932px 1605px #fff;
  animation: animStar 100s linear infinite;
  opacity: 0.5;
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: rgba(0, 0, 0, 0);
    box-shadow: 1490px 1137px #fff, 1750px 1970px #fff, 1499px 722px #fff, 159px 164px #fff, 1433px 1437px #fff,
      1383px 737px #fff, 890px 1354px #fff, 1736px 1461px #fff, 23px 981px #fff, 433px 782px #fff, 1531px 719px #fff,
      1869px 1730px #fff, 1259px 600px #fff, 379px 1545px #fff, 243px 1244px #fff, 292px 1981px #fff, 626px 1377px #fff,
      1350px 1312px #fff, 1138px 1682px #fff, 1895px 766px #fff, 1656px 987px #fff, 431px 406px #fff, 1133px 254px #fff,
      947px 298px #fff, 1185px 1666px #fff, 1677px 1669px #fff, 1252px 578px #fff, 1435px 526px #fff, 1098px 1939px #fff,
      1573px 374px #fff, 1886px 1642px #fff, 904px 120px #fff, 1216px 1293px #fff, 927px 505px #fff, 1946px 1708px #fff,
      364px 1524px #fff, 372px 1516px #fff, 54px 1929px #fff, 1085px 1088px #fff, 671px 1531px #fff, 721px 596px #fff,
      102px 1702px #fff, 1715px 187px #fff, 1715px 1590px #fff, 1723px 1908px #fff, 519px 829px #fff, 1865px 243px #fff,
      1581px 146px #fff, 1568px 1568px #fff, 582px 558px #fff, 1203px 742px #fff, 294px 649px #fff, 1907px 790px #fff,
      1065px 1046px #fff, 1281px 1129px #fff, 991px 959px #fff, 1269px 423px #fff, 1772px 944px #fff, 1847px 342px #fff,
      237px 375px #fff, 1821px 1811px #fff, 207px 328px #fff, 379px 1505px #fff, 218px 1784px #fff, 47px 170px #fff,
      299px 237px #fff, 507px 246px #fff, 312px 1110px #fff, 289px 952px #fff, 1405px 227px #fff, 1365px 709px #fff,
      790px 133px #fff, 1543px 466px #fff, 1784px 386px #fff, 362px 858px #fff, 1690px 1989px #fff, 1048px 566px #fff,
      1059px 1100px #fff, 1690px 1121px #fff, 780px 868px #fff, 204px 448px #fff, 874px 969px #fff, 1414px 1359px #fff,
      309px 1834px #fff, 166px 80px #fff, 110px 1608px #fff, 933px 569px #fff, 1096px 553px #fff, 130px 1014px #fff,
      239px 1780px #fff, 1469px 126px #fff, 714px 1679px #fff, 828px 988px #fff, 416px 337px #fff, 1772px 1803px #fff,
      1802px 732px #fff, 1396px 872px #fff, 947px 560px #fff, 782px 1312px #fff, 88px 758px #fff, 224px 678px #fff,
      842px 863px #fff, 1609px 312px #fff, 1279px 788px #fff, 1801px 1277px #fff, 1859px 1830px #fff, 1875px 22px #fff,
      599px 1429px #fff, 1739px 58px #fff, 1120px 1765px #fff, 1917px 946px #fff, 516px 1438px #fff, 451px 136px #fff,
      914px 1520px #fff, 1627px 311px #fff, 121px 342px #fff, 223px 1359px #fff, 1557px 118px #fff, 981px 811px #fff,
      1540px 105px #fff, 555px 1111px #fff, 666px 487px #fff, 1638px 685px #fff, 576px 134px #fff, 1714px 387px #fff,
      1055px 1745px #fff, 102px 185px #fff, 1605px 427px #fff, 1898px 1800px #fff, 181px 1035px #fff, 1264px 821px #fff,
      1328px 395px #fff, 1246px 68px #fff, 1829px 960px #fff, 914px 403px #fff, 447px 1950px #fff, 1354px 121px #fff,
      741px 907px #fff, 1457px 876px #fff, 1926px 1295px #fff, 1375px 1511px #fff, 877px 1935px #fff, 733px 1184px #fff,
      195px 81px #fff, 1580px 1002px #fff, 1392px 1421px #fff, 122px 1373px #fff, 1100px 1204px #fff, 1294px 340px #fff,
      215px 1569px #fff, 1272px 541px #fff, 448px 128px #fff, 1648px 1702px #fff, 1272px 1608px #fff, 1133px 153px #fff,
      1894px 632px #fff, 1438px 371px #fff, 1872px 1224px #fff, 539px 1889px #fff, 1010px 1330px #fff, 1340px 244px #fff,
      1456px 273px #fff, 1374px 187px #fff, 1842px 382px #fff, 13px 708px #fff, 808px 839px #fff, 846px 1991px #fff,
      1887px 1031px #fff, 695px 476px #fff, 1811px 52px #fff, 690px 230px #fff, 1800px 1203px #fff, 1428px 1894px #fff,
      1758px 499px #fff, 1109px 1340px #fff, 1086px 1832px #fff, 1705px 644px #fff, 1299px 1839px #fff,
      139px 1130px #fff, 612px 832px #fff, 872px 496px #fff, 1061px 1320px #fff, 1609px 421px #fff, 1351px 884px #fff,
      192px 917px #fff, 31px 1972px #fff, 1497px 1135px #fff, 832px 865px #fff, 714px 1806px #fff, 533px 1808px #fff,
      1467px 382px #fff, 1452px 945px #fff, 122px 389px #fff, 1822px 156px #fff, 1530px 7px #fff, 850px 301px #fff,
      1330px 528px #fff, 367px 1086px #fff, 176px 1074px #fff, 932px 1605px #fff;
  }
}

#stars3 {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(0, 0, 0, 0);
  box-shadow: 1350px 181px #fff, 314px 462px #fff, 1648px 194px #fff, 1429px 745px #fff, 8px 625px #fff,
    1108px 49px #fff, 1978px 1759px #fff, 1255px 518px #fff, 300px 1173px #fff, 542px 1610px #fff, 607px 1215px #fff,
    1167px 660px #fff, 1847px 671px #fff, 36px 918px #fff, 1831px 489px #fff, 228px 7px #fff, 597px 1322px #fff,
    238px 824px #fff, 1315px 673px #fff, 1998px 256px #fff, 1591px 1611px #fff, 1894px 1410px #fff, 891px 424px #fff,
    360px 968px #fff, 457px 1078px #fff, 1997px 925px #fff, 1158px 1803px #fff, 376px 1397px #fff, 830px 303px #fff,
    109px 1106px #fff, 1825px 1928px #fff, 841px 1577px #fff, 417px 79px #fff, 491px 1181px #fff, 680px 908px #fff,
    557px 554px #fff, 704px 916px #fff, 1272px 1687px #fff, 81px 582px #fff, 1512px 213px #fff, 683px 1656px #fff,
    1061px 1209px #fff, 1914px 1297px #fff, 1098px 1442px #fff, 488px 359px #fff, 773px 561px #fff, 277px 420px #fff,
    590px 933px #fff, 1px 108px #fff, 1981px 661px #fff, 695px 960px #fff, 960px 948px #fff, 260px 98px #fff,
    1099px 1229px #fff, 121px 1267px #fff, 647px 1943px #fff, 595px 1450px #fff, 1057px 1711px #fff, 1876px 1620px #fff,
    838px 482px #fff, 253px 935px #fff, 648px 1142px #fff, 819px 889px #fff, 1580px 1817px #fff, 1777px 1791px #fff,
    1962px 1009px #fff, 1534px 1876px #fff, 1535px 1350px #fff, 802px 621px #fff, 1537px 1479px #fff, 1728px 1662px #fff,
    886px 1060px #fff, 789px 1587px #fff, 1929px 1232px #fff, 1365px 638px #fff, 526px 894px #fff, 425px 1793px #fff,
    828px 804px #fff, 753px 1715px #fff, 413px 915px #fff, 1725px 1775px #fff, 1577px 1742px #fff, 785px 400px #fff,
    1150px 1067px #fff, 1721px 1949px #fff, 359px 1889px #fff, 690px 1384px #fff, 178px 1206px #fff, 1611px 584px #fff,
    1217px 774px #fff, 1174px 1684px #fff, 1861px 1574px #fff, 779px 441px #fff, 1655px 852px #fff, 789px 108px #fff,
    1171px 1162px #fff, 769px 143px #fff, 834px 1897px #fff, 921px 1111px #fff, 447px 1564px #fff;
  animation: animStar 150s linear infinite;
  opacity: 0.5;
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: rgba(0, 0, 0, 0);
    box-shadow: 1350px 181px #fff, 314px 462px #fff, 1648px 194px #fff, 1429px 745px #fff, 8px 625px #fff,
      1108px 49px #fff, 1978px 1759px #fff, 1255px 518px #fff, 300px 1173px #fff, 542px 1610px #fff, 607px 1215px #fff,
      1167px 660px #fff, 1847px 671px #fff, 36px 918px #fff, 1831px 489px #fff, 228px 7px #fff, 597px 1322px #fff,
      238px 824px #fff, 1315px 673px #fff, 1998px 256px #fff, 1591px 1611px #fff, 1894px 1410px #fff, 891px 424px #fff,
      360px 968px #fff, 457px 1078px #fff, 1997px 925px #fff, 1158px 1803px #fff, 376px 1397px #fff, 830px 303px #fff,
      109px 1106px #fff, 1825px 1928px #fff, 841px 1577px #fff, 417px 79px #fff, 491px 1181px #fff, 680px 908px #fff,
      557px 554px #fff, 704px 916px #fff, 1272px 1687px #fff, 81px 582px #fff, 1512px 213px #fff, 683px 1656px #fff,
      1061px 1209px #fff, 1914px 1297px #fff, 1098px 1442px #fff, 488px 359px #fff, 773px 561px #fff, 277px 420px #fff,
      590px 933px #fff, 1px 108px #fff, 1981px 661px #fff, 695px 960px #fff, 960px 948px #fff, 260px 98px #fff,
      1099px 1229px #fff, 121px 1267px #fff, 647px 1943px #fff, 595px 1450px #fff, 1057px 1711px #fff,
      1876px 1620px #fff, 838px 482px #fff, 253px 935px #fff, 648px 1142px #fff, 819px 889px #fff, 1580px 1817px #fff,
      1777px 1791px #fff, 1962px 1009px #fff, 1534px 1876px #fff, 1535px 1350px #fff, 802px 621px #fff,
      1537px 1479px #fff, 1728px 1662px #fff, 886px 1060px #fff, 789px 1587px #fff, 1929px 1232px #fff,
      1365px 638px #fff, 526px 894px #fff, 425px 1793px #fff, 828px 804px #fff, 753px 1715px #fff, 413px 915px #fff,
      1725px 1775px #fff, 1577px 1742px #fff, 785px 400px #fff, 1150px 1067px #fff, 1721px 1949px #fff,
      359px 1889px #fff, 690px 1384px #fff, 178px 1206px #fff, 1611px 584px #fff, 1217px 774px #fff, 1174px 1684px #fff,
      1861px 1574px #fff, 779px 441px #fff, 1655px 852px #fff, 789px 108px #fff, 1171px 1162px #fff, 769px 143px #fff,
      834px 1897px #fff, 921px 1111px #fff, 447px 1564px #fff;
  }
}
</style>
