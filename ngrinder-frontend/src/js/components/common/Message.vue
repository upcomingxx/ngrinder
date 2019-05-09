<template>
    <div id="message-container">
        <transition name="fade">
            <div class="alert message-div" :class="msgClass" id="message_div" v-show="showMsgDiv" v-text="alterMsg"></div>
        </transition>
        <transition name="fade">
            <div class="alert message-div alert-danger" id="error_msg_div" v-show="showErrMsgDiv">
                <button class="close" id="error_msg_div_btn" @click="close">&times;</button>
                <h4 class="alert-heading" v-text="'ERROR'"></h4>
                <span style="margin-left:20px" v-text="errMessage"></span>
            </div>
        </transition>
        <transition name="fade">
            <div class="progress-bar progress-bar-info progress-bar-striped active message-div" id="progress_bar_div" v-show="showPrgDiv">
                <div class="bar" v-text="prgMessage"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Base from "../Base.vue"
    import Component from 'vue-class-component';

    @Component({
        name: 'message'
    })
    export  default class Message extends Base {
        msgTimeout = {};
        showMsgDiv = false;
        showErrMsgDiv = false;
        showPrgDiv = false;
        prgMessage = '';
        msgClass = '';
        alterMsg = '';
        errMessage = '';

        mounted() {
            this.showExceptionMsg();
            this.showInitialMsg();
            $('#message-container').appendTo("body");
        }

        close() {
            this.showErrMsgDiv = false;
            this.errMessage = '';
        }

        showExceptionMsg() {
            if (ngrinder.exception) {
                this.showErrorMsg(ngrinder.exception);
            }
        }

        showInitialMsg() {
            if (ngrinder.message) {
                this.showSuccessMsg(ngrinder.message);
            }
        }

        showMsg(color, message) {
            this.showMsgDiv = false;
            this.msgClass = color;
            this.alterMsg = message;
            this.showMsgDiv = true;

            clearTimeout(this.msgTimeout);
            this.msgTimeout = setTimeout(() => {
                this.showMsgDiv = false;
                this.msgClas = '';
            }, 3000);
        }

        showErrorMsg(msg) {
            this.showErrMsgDiv = false;
            this.errMessage = msg;
            this.showErrMsgDiv = true;
        }

        showProgressBar(msg) {
            this.showPrgDiv = true;
            this.prgMessage = '';
            this.prgMessage = msg;
        }

        hideProgressBar() {
            this.showPrgDiv = false;
        }
    }
</script>
<style lang="less" scoped>
    #messaage-container {

        #error_msg_div {
            z-index: 1152;
        }

        #message_div {
            z-index: 1151;
        }

        .progress-bar {
            height: 20px;

            .bar {
                width: 100%;
            }
        }

    }
</style>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
