
function coloringTable() {
    // Tô màu xe kẽ các dòng trong table
    // console.log("ok");
    let tb = document.getElementsByClassName("infoCustomer")[0];

    let count = 0;
    let tbody = tb.firstElementChild;
    let row = tbody.firstElementChild;
    while (row) {

        if (count % 2 == 0 && count != 0) {
            let td = row.firstElementChild;
            while (td) {
                td.style.backgroundColor = "#2ea4bb";
                td = td.nextElementSibling;
            }

        }
        row = row.nextElementSibling;
        //console.log(row);
        count++;
    }
}
// can chinh top cho cái item trong 2 box
function alignTop(input) {
    let p = input.firstElementChild;
    let top = 0;
    while (p) {
        p.style.top = top + 'px';
        p.style.left = '1px';

        let Objcss = getComputedStyle(p);
        //console.log(Objcss);
        top += parseInt(Objcss.blockSize) + 2;
        // console.log(top);
        p = p.nextElementSibling;
    }
}
function alignItem(thumb) {
    let top = parseInt(thumb.style.top);
    let left = parseInt(thumb.style.left);
    top += 15;
    let listProducts = document.getElementsByClassName("detailListProduct")[0];
    top -= listProducts.scrollTop;
    thumb.style.top = top + 'px';

    // Width window
    let bodyElement = document.getElementsByTagName("BODY")[0];
    let widthWindow = bodyElement.offsetWidth;
    let offsetLeft = 0.3 * widthWindow;
    if (thumb.id.startsWith("s")) {
        left += offsetLeft;
    }
    thumb.style.left = left + 'px';
}

function handleMouseDown(e) {
    //alert("ok");

    //handleMouseClick(this.id);

    this.oddX = e.clientX;
    this.oddY = e.clientY;
    //this.isDown = true;

    this.classList.toggle("bgClick");
    const thumb = this.cloneNode(true);
    thumb.style.width = '42.5%';
    thumb.isDown = true;
    thumb.classList.toggle('thumb');
    this.parentNode.parentNode.parentNode.appendChild(thumb);
    // align item
    alignItem(thumb);

    thumb.original = this;

    thumb.addEventListener('mouseup', handleMouseUp);
    thumb.addEventListener('mousemove', handleMouseMove);
}

function handleMouseMove(e) {
    if (this.isDown) {

        const dX = e.clientX - this.oddX;
        const dY = e.clientY - this.oddY;

        //console.log(dX + " " + dY);
        // console.log(this.style.left + " " + this.style.top);
        this.style.left = parseInt(this.style.left) + dX + 'px';
        this.style.top = parseInt(this.style.top) + dY + 'px';
        //console.log(this.style.left + " " + this.style.top);
        this.oddX = e.clientX;
        this.oddY = e.clientY;
    }
}

var check;
function handleMouseUpSelectedProduct() {
    //alert("ok");

    direct1();

    //e.preventDefault();
}
function handleMouseUp() {

    this.isDown = false;
    // console.log(this.style.left + " " + this.style.top)



    // xu li khi item chua duoc chon
    if (this.id.startsWith("p")) {
        // alert("ok");       

        let ori = this.original;

        let bodyElement = document.getElementsByTagName("BODY")[0];
        let widthWindow = bodyElement.offsetWidth;

        minLeft = 0.25 * widthWindow;
        //console.log(minLeft);
        //console.log(widthWindow);
        console.log(this.style.left);
        if (parseInt(this.style.left) > minLeft && parseInt(this.style.top) >= 0) {
            direct1();
        }

        this.parentNode.removeChild(this);
    }
    else if (this.id.startsWith("s")) {
        if (parseInt(this.style.left) >= 0 && parseInt(this.style.left) < minLeft && parseInt(this.style.top) >= 0) {
            direct3();
        }
        this.parentNode.removeChild(this);
    }

}
function handleMouseClick(id) {
    document.getElementById(id).addEventListener('click', function () {
        //console.log(this);
        this.classList.toggle("bgClick");
    });
}
function direct1() {
    //alert("ok");
    let listProducts = document.getElementsByClassName("detailListProduct")[0];
    let selectedProducts = document.getElementsByClassName("detailSelectedProduct")[0];

    let p = listProducts.firstElementChild;
    let temp = p;
    while (p) {
        temp = p.nextElementSibling;
        if (p.classList.contains("bgClick")) {
            p.id = "s" + p.id;
            selectedProducts.appendChild(p);
            p.classList.toggle("bgClick");
        }
        p = temp;
    }

    alignTop(selectedProducts);
    alignTop(listProducts);

    check = true;
}

function direct2() {
    let listProducts = document.getElementsByClassName("detailListProduct")[0];
    let selectedProducts = document.getElementsByClassName("detailSelectedProduct")[0];
    let p = listProducts.firstElementChild;
    let temp = p;
    while (p) {
        temp = p.nextElementSibling;
        p.id = "s" + p.id;
        selectedProducts.appendChild(p);
        p = temp;
    }
    alignTop(selectedProducts);

}

function direct3() {
    let listProducts = document.getElementsByClassName("detailListProduct")[0];
    let selectedProducts = document.getElementsByClassName("detailSelectedProduct")[0];

    let p = selectedProducts.firstElementChild;
    let temp = p;
    while (p) {
        temp = p.nextElementSibling;
        if (p.classList.contains("bgClick")) {
            p.id = p.id.substring(1);
            listProducts.appendChild(p);
            p.classList.toggle("bgClick");
        }
        p = temp;
    }
    alignTop(listProducts);
    alignTop(selectedProducts);
}

function direct4() {
    let listProducts = document.getElementsByClassName("detailListProduct")[0];
    let selectedProducts = document.getElementsByClassName("detailSelectedProduct")[0];
    let p = selectedProducts.firstElementChild;
    let temp = p;
    while (p) {
        temp = p.nextElementSibling;
        p.id = p.id.substring(1);
        listProducts.appendChild(p);
        p = temp;
    }
    alignTop(listProducts);
}
window.onload = function () {
    coloringTable();
    // event click box
    for (let i = 1; i <= 10; i++) {

        document.getElementById("p" + i).addEventListener('mousedown', handleMouseDown);
        document.getElementById("p" + i).addEventListener('mousemove', handleMouseMove);
        document.getElementById("p" + i).addEventListener('mouseup', handleMouseUp);
    }

    // add event for >
    document.getElementById("direct1").addEventListener('click', function () {
        direct1();
    });
    // add event for >>
    document.getElementById("direct2").addEventListener('click', function () {
        direct2();
    });

    // add event for <
    document.getElementById("direct3").addEventListener('click', function () {
        direct3();
    });

    // add event for <<
    document.getElementById("direct4").addEventListener('click', function () {
        direct4();
    });

    let box1 = document.getElementsByClassName("detailListProduct")[0];
    alignTop(box1);
    let box2 = document.getElementsByClassName("detailSelectedProduct")[0];
    alignTop(box2);

    // align bulletin
    alignBulletin();


    // event expand bulletin
    let arr = document.getElementsByClassName("icon1");
    for (let p of arr) {
        p.addEventListener('click', function () {
            console.log(p);
            let content = p.parentNode.nextElementSibling;
            let title = p.parentNode;
            title.classList.toggle("open");
            content.classList.toggle("disp");
            content.classList.toggle("hiddenText");
            content.classList.toggle("borderBuletin");

            let icon1 = title.firstElementChild;
            let icon2 = title.lastElementChild;
            icon2.classList.toggle("darkIcon2");

            if (title.classList.contains("open")) {
                icon1.innerHTML = "&#8595;";
            }
            else {
                icon1.innerHTML = "&#8227;";

            }
            icon1.classList.toggle("darkIcon1")

            alignBulletin();
        })


    }

    // Event mouse up, mouse down for
    const arrBul = document.getElementsByClassName("icon2");
    for (let p of arrBul) {
        p.addEventListener('mousedown', handelMouseDownBul);
        p.addEventListener('mouseup', handelMouseUpBul);
        p.addEventListener('mousemove', handelMouseMoveBul);
    }
    // Add event for menu button
    for (let i = 1; i <= 5; i++) {
        //console.log(document.getElementById("m" + i));
        document.getElementById("m" + i).addEventListener("click", function () {

            for (let i = 1; i <= 5; i++) {
                if (this != document.getElementById("m" + i)) {
                    document.getElementById("m" + i).classList.remove("a-click");
                    document.getElementById("fm" + i).classList.remove("menu-bg");
                }
            }
            this.classList.toggle("a-click");
            document.getElementById("fm" + i).classList.toggle("menu-bg");
        });
    }
}

function handelMouseDownBul(e) {
    let bulletin = this.parentNode.parentNode;
    bulletin.oddY = e.clientY;

    //this.isDown = true;

    const thumb = bulletin.cloneNode(true);
    thumb.isDown = true;
    thumb.classList.toggle('thumb');
    this.parentNode.parentNode.parentNode.appendChild(thumb);
    thumb.original = bulletin;



    thumb.addEventListener('mouseup', handelMouseUpBul);
    thumb.addEventListener('mousemove', handelMouseMoveBul);
}
function handelMouseMoveBul(e) {
    if (this.isDown) {

        const dY = e.clientY - this.oddY;

        //console.log(dX + " " + dY);
        // console.log(this.style.left + " " + this.style.top);
        this.style.top = parseInt(this.style.top) + dY + 'px';
        console.log(this.style.left + " " + this.style.top);
        this.oddX = e.clientX;
        this.oddY = e.clientY;
    }
}
function handelMouseUpBul(e) {
    this.isDown = false;
    let parent = this.parentNode;
    let ori = this.original;
    let p = parent.firstElementChild;

    let top = parseInt(this.style.top);
    console.log(top);
    //console.log(this);
    while (p) {

        let t = parseInt(p.style.top);

        if (t > top) {
            break;
        }
        p = p.nextElementSibling;

    }
    console.log(p);
    if (p == null) {
        parent.append(ori);
    }
    else {
        parent.insertBefore(ori, p.nextElementSibling);
    }
    parent.removeChild(this);
    alignBulletin();

}

let register = document.getElementById("register");
let deleteAll = document.getElementById("del");

function showMessage(input, value) {
    input.innerText = value;
}

function checkName(name) {
    const arr = name.split(" ");
    let d = document.getElementById("err1");
    if (arr.length < 2) {

        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errName"), "*Họ và tên chưa hợp lệ");
        return false;
    }
    d.classList.add("disp")
    return true;
}
function checkAddress(address) {
    //alert("ok");
    let d = document.getElementById("err2");
    if (address.length == 0) {


        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errAddress"), "*Địa chỉ chưa được điền");
        return false;
    }
    const arr = address.split(" ");
    if (arr.length < 2) {


        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errAddress"), "*Địa chỉ chưa hợp lệ");
        return false;
    }
    d.classList.add("disp");
    return true;
}

function checkTel(tel) {
    let d = document.getElementById("err3");
    if (tel.length != 10) {
        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errTel"), "*Số chưa bao gồm 10 kí tự");
        return false;
    }

    var isNumber = /^[0-9]+$/.test(tel);
    if (!isNumber) {
        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errTel"), "*Dữ liệu không phải số");
        return false;
    }

    if (tel[0] != '0') {
        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errTel"), "*Số đầu tiên không bằng 0");
        return false;
    }

    d.classList.add("disp");
    return true;
}

function checkGender(input) {

    let d = document.getElementById("err4");

    if (input == null) {
        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errGender"), "*Chưa chọn giới tính");
        return false;
    }

    d.classList.add("disp");
    return true;
}

function checkDate(date) {
    let d = document.getElementById("err5");
    if (date == "") {
        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errDate"), "*Chưa chọn ngày");
        return false;
    }
    let date1 = new Date(date);
    let date2 = new Date();

    console.log()

    if (date1.getDay() == date2.getDay() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) {
        return true;
    }
    if (date1 < date2) {
        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errDate"), "*Ngày giao không được trước ngày hiện tại");
        return false;
    }
    d.classList.add("disp");
    return true;
}
function checkEmail(email) {
    let d = document.getElementById("err6");
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    //console.log(emailPattern.test(email));
    if (!res.test(email)) {
        if (d.classList.contains("disp")) {
            d.classList.remove("disp");
        }
        showMessage(document.getElementById("errEmail"), "*Email không hợp lệ");
        return false;
    }
    d.classList.add("disp");
    return true;
}


// check detailSelectedProduct has childElementNode
function hasElementChildNodes(input) {
    let count = 0;
    let p = input.firstElementChild;
    while (p) {
        count++;
        p = p.nextElementSibling;
    }
    return count;
}

//
register.addEventListener('click', function () {
    let fullname = document.getElementById("fullname").value;
    fullname = fullname.trim();
    let address = document.getElementById("address").value;
    address = address.trim();
    let tel = document.getElementById("tel").value;
    tel = tel.trim();
    let radio = document.getElementsByName("gender");
    let gender = null;
    for (let g of radio) {
        if (g.checked) {
            gender = g.value;
        }
    }

    let date = document.getElementById("date").value;
    //console.log(date);
    let email = document.getElementById("email").value;

    /*console.log(fullname);
    console.log(address);
    console.log(tel);
    console.log(radio);
    console.log(date);
    console.log(email);*/
    // console.log(email);
    let check = true;
    check = check && checkName(fullname);
    check = checkAddress(address) && check;
    check = checkTel(tel) && check;
    check = checkGender(gender) && check;
    check = checkDate(date) && check;
    check = checkEmail(email) && check;


    if (check) {
        let selectedProducts = document.getElementsByClassName("detailSelectedProduct")[0];

        if (!hasElementChildNodes(selectedProducts)) {
            alert("Vui lòng chọn sản phẩm!")
            return;
        }



        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');

        td1.innerText = fullname;
        td2.innerText = gender;
        td3.innerText = address;
        td4.innerText = date;

        let txt = "";
        let p = selectedProducts.firstElementChild;
        while (p) {
            let content = p.firstElementChild;
            content = content.nextElementSibling;
            txt += content.innerText + "; ";

            p = p.nextElementSibling;
        }
        txt = txt.substring(0, txt.length - 2);
        td5.innerText = txt;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        let table = document.getElementsByClassName("infoCustomer")[0];
        let tbody = table.firstElementChild;
        tbody.appendChild(tr);

        //console.log(table);
        coloringTable();

    }
});

deleteAll.addEventListener('click', function () {
    //alert("ok");
    let table = document.getElementsByClassName("infoCustomer")[0];
    let parent = table.firstElementChild;
    let tr = parent.firstElementChild.nextElementSibling;
    //tr = tr.nextElementSibling;
    console.log(tr);
    while (tr) {
        let temp = tr.nextElementSibling;
        parent.removeChild(tr);
        tr = temp;
    }

});

function alignBulletin() {
    let side = document.getElementsByClassName("Side")[0];
    let p = side.firstElementChild;
    p.style.top = '5px';


    while (p) {
        let top = parseInt(p.style.top);
        //console.log(top);
        let f = p.firstElementChild;
        let l = p.lastElementChild;

        let css1 = getComputedStyle(f, null);
        let css2 = getComputedStyle(l, null);
        // console.log(css2.blockSize);

        top += parseInt(css1.blockSize);

        if (!l.classList.contains("disp")) {
            top += parseInt(css2.blockSize);
        }
        p = p.nextElementSibling;
        if (p != null) {
            p.style.top = 2 + top + 'px';
        }
    }
}

// Cap nhat lai giao dien, khi kich thuoc window thay doi
var body = document.getElementsByTagName("BODY")[0];
if (window.addEventListener) {  // all browsers except IE before version 9
    window.addEventListener("resize", onResizeEvent, true);
} else {
    if (window.attachEvent) {   // IE before version 9
        window.attachEvent("onresize", onResizeEvent);
    }
}
function onResizeEvent() {
    alignBulletin();

    //
    let listProducts = document.getElementsByClassName("detailListProduct")[0];
    let selectedProducts = document.getElementsByClassName("detailSelectedProduct")[0];

    alignTop(listProducts);
    alignTop(selectedProducts);
}

function clean(node) {
    let p = node.firstElementChild;
    while (p) {
        console.log(p);
        p = p.nextElementSibling;
    }
}

let formInput = document.getElementsByClassName("formInput")[0];
clean(formInput);
