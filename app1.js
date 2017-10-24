
var doituong = {
    ten : 'tho',
    ho  : 'quoc',
    chaomung  : function(){
     return this.ho + this.ten;
    }
};

function KhoaHoc(ten,hocphi) {
    this.ten = ten;
    this.hocphi = hocphi;
    this.motadefault =  function () {
        console.log('motadefault Chao' + this.ten + this.hocphi);
    }
}

KhoaHoc.prototype.mota = function () {
    console.log('Chao' + this.ten + this.hocphi);
};

var nodejs = new KhoaHoc('lap trinh nodejs',800000);
nodejs.hello = 'aaaa';
nodejs.mota();
console.log(nodejs.hello);
