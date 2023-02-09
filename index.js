/* -rwxr-x--x
 girilen veriyi analiz etsin

 Ex/
 Owner's Permissions : 
 Read
 Write 
 Execute

 File Type: blabla
 ------------------------------------------

 parametre ekle
 parametreyi string içinde bul
 sonrasında bunu sildir
 boşluk karakterini sildir
 -rwxrwxrwx bu veri tipine göre değerlendir.

parametreye göre istenilen işlemi yaptır ve kullanıcıya sun.
*/

const girdi = document.getElementById('girdi');
const cikti = document.getElementById('cikti');

function decode(event) {

    if (event.key !== "Enter") {
        return;
    }

    // Temizlik yapalım
    cikti.innerHTML = null;

    let veri = girdi.value // girilen veriyi string olarak aldık ana veri + parametre
    const veri_dizisi = veri.split(' '); // string olarak aldığımız veriyi ana veri ve parametre olarak ikiye ayırdık dizi oluşturduk.
    const ana_veri = veri_dizisi[0]; // ana_verimizi aldık --string olarak--
    const parametre = veri_dizisi[1]; // parametremizi aldık --string olarak--
    const ana_veri_dizisi = ana_veri.split('') //ana verimizi tamamiyle ayırarak dizi haline getirdik. ['r', 'w', 'x', 'r', '-', 'x', '-', '-', 'x'] => shiftten sonraki düşmüş hali
    const file_type_symbol = ana_veri_dizisi.shift(); //file type ın sembolünü aldık.
    
    console.log(file_type_symbol);
    console.log(ana_veri_dizisi);
    
    const owners_perm = ana_veri_dizisi.slice(0, 3);
    const grps_perm = ana_veri_dizisi.slice(3, 6);
    const others_perm = ana_veri_dizisi.slice(6);

    const result = document.createElement('ul');
    
    switch(parametre) {
        case '-a':
            //Owners
            let owners_perm_str = [];
            if(owners_perm[0] == 'r') owners_perm_str[0] = 'Read';
            if(owners_perm[1] == 'w') owners_perm_str[1] = 'Write';
            if(owners_perm[2] == 'x') owners_perm_str[2] = 'Execute';
    
            //Groups
            let grps_perm_str = [];
            if(grps_perm[0] == 'r') grps_perm_str[0] = 'Read';
            if(grps_perm[1] == 'w') grps_perm_str[1] = 'Write';
            if(grps_perm[2] == 'x') grps_perm_str[2] = 'Execute';
    
            //Others
            let others_perm_str = [];
            if(others_perm[0] == 'r') others_perm_str[0] = 'Read';
            if(others_perm[1] == 'w') others_perm_str[1] = 'Write';
            if(others_perm[2] == 'x') others_perm_str[2] = 'Execute';
    
            console.log(owners_perm_str);
            console.log(grps_perm_str);
            console.log(others_perm_str);
    
            const result_owners_perm = owners_perm_str.filter(x => x).toString()
            const result_grps_perm = grps_perm_str.filter(x => x).toString()
            const result_others_perm = others_perm_str.filter(x => x).toString()

            const a_owners_li = document.createElement('li');
            a_owners_li.innerHTML = 'Owners Permissions :' + ' ' + result_owners_perm;
            result.appendChild(a_owners_li);
            
            const a_groups_li = document.createElement('li');
            a_groups_li.innerHTML = 'Groups Permissions :' + ' ' + result_grps_perm;
            result.appendChild(a_groups_li);

            const a_others_li = document.createElement('li');
            a_others_li.innerHTML = 'Others Permissions :' + ' ' + result_others_perm;
            result.appendChild(a_others_li);

            //File Type
            let file_type = null;
    
            switch(file_type_symbol) {
                case '-':
                    file_type = 'Regular File';
                    break;
                case 'd':
                    file_type = 'Directory File';
                    break;
                case 'c':
                    file_type = 'Character Device File';
                    break;
                case 's':
                    file_type = 'Socket File';
                    break;
            }
    
            const file_type_li = document.createElement('li');
            file_type_li.innerHTML = 'File Type :' + ' ' + file_type;
            result.appendChild(file_type_li);
            break;
        case '-h':
            const help_li = document.createElement('li');
            help_li.innerHTML = 'Parameters : <br> -h => Bu ekranı açar <br> -a => verinin analizini yapar <br> -num => veriyi sayısal sisteme getirir '; 
            result.appendChild(help_li);
            break;
        case '-num':
            let sayisal = [[], [], []];
            for (let i = 0; i < owners_perm.length; i++) {
                if (owners_perm[i] != '-') sayisal[0][i] = 1;
                else sayisal[0][i] = 0;
            }
            for (let i = 0; i < grps_perm.length; i++) {
                if (grps_perm[i] != '-') sayisal[1][i] = 1;
                else sayisal[1][i] = 0;
            }
            for (let i = 0; i < others_perm.length; i++) {
                if (others_perm[i] != '-') sayisal[2][i] = 1;
                else sayisal[2][i] = 0;
            }

            const num_owners_li = document.createElement('li');
            num_owners_li.innerHTML = 'Owners Permissions :' + ' ' + parseInt(sayisal[0].join(''), 2);
            result.appendChild(num_owners_li);
            
            const num_groups_li = document.createElement('li');
            num_groups_li.innerHTML = 'Groups Permissions :' + ' ' + parseInt(sayisal[1].join(''), 2);;
            result.appendChild(num_groups_li);

            const num_others_li = document.createElement('li');
            num_others_li.innerHTML = 'Others Permissions :' + ' ' + parseInt(sayisal[2].join(''), 2);;
            result.appendChild(num_others_li);

            break;
    }

    cikti.appendChild(result);
}

function toggle() {
    const div_console = document.getElementsByClassName('console')[0];
    if (div_console.style.width == '30%') {
        div_console.style.width = '90%';
        div_console.style.height = '90%';
    } else {
        div_console.style.width = '30%';
        div_console.style.height = '50%';
    }

}