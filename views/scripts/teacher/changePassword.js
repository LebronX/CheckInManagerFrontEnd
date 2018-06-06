var changePasswordform = new Vue({
    el: '#changePassword',
    data: {
        em1: '',
        em2: '',
        em3: '',
        oldPW: '',
        newPW: '',
        confirmPW: ''
    },
    methods: {
        checkInput: function() {
            //p>0时为出错
            //前端需要检查做新密码两次输入是否一致、检查是否输入为空
            var p = 0;
            if (changePasswordform.oldPW === '') {
                p++;
                changePasswordform.em1 = '旧密码不能为空';
            } else {
                changePasswordform.em1 = '';
            };
            if (changePasswordform.newPW === '') {
                p++;
                changePasswordform.em2 = '新密码不能为空';
            } else {
                changePasswordform.em2 = '';
            };
            if (changePasswordform.confirmPW === '') {
                p++;
                changePasswordform.em3 = '确认新密码不能为空';
            } else {
                changePasswordform.em3 = '';
            };

            if(changePasswordform.newPW != changePasswordform.confirmPW) {
                p++;
                changePasswordform.em3 = '两次密码不一样！';
            }

            alert('checkinput');
            alert('p',p);
            if (p>0) {
                return false;
            };
            console.log('patch');
            axios.patch('/api/user/password', {
                'old_password': changePasswordform.oldpw,
                'password': changePasswordform.newpw
            })
            .then(function (response) {
                console.log(response.status);
                if (response.status == 201) {
                    window.location="/user/login";
                }
            })
            .catch(function (error) {
                //alert(error.status);
                console.log(error.response.status);
            });
        },
        back:function () {
             window.location="/course";
        },
        quitLogin: function() {
            console.log('cookie',document.cookie);
            axios.delete('/api/users/session')
            .then(function (response) {
                console.log(response.status);
                window.location="/";
            })
            .catch(function (error) {
                alert(response.data);
            });
        },
        changPassword:function() {
            window.location="/user/change_password";
        }
    }
});

function checkInput_jq() {
    console.log('patch');
    axios.patch('/api/user/password', {
        'old_password': changePasswordform.oldpw,
        'password': changePasswordform.newpw
    })
    .then(function (response) {
        console.log(response.status);
        if (response.status == 201) {
            window.location="/user/login";
        }
    })
    .catch(function (error) {
        //alert(error.status);
        console.log(error.response.status);
    });
}

function addEvents() {
    //alert('addevents');
    //alert(changePasswordform.checkInput);
    console.log(changePasswordform.checkInput);
    //alert($("#ensurePost").val());
    //$("#ensurePost").click(changePasswordform.checkInput);
    $("#ensurePost").click(checkInput_jq);
}

$(document).ready(addEvents);