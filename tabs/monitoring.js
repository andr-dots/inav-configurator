'use strict';

// This file is based on pid_tuning.js


import GUI from './../js/gui';
import tabs from './../js/tabs';
import Settings from './../js/settings';
import i18n from './../js/localization';

import sensorsTab from './sensors';
import osdTab from './osd';

const monitoringTab = {};


monitoringTab.initialize = function (callback) {

    if (GUI.active_tab != 'monitoring') {
        GUI.active_tab = 'monitoring';
    }

    import('./monitoring.html?raw').then(({default: html}) => GUI.load(html, Settings.processHtml(process_html)));

    function process_html() {
        // translate to user-selected language
        i18n.localize();



        GUI.simpleBind();

        // UI Hooks

        $('a.refresh').on('click', function () {
            $("#content-watermark").remove();
            $(".tab-monitoring").remove();

            GUI.tab_switch_cleanup(function () {
                monitoringTab.initialize();
            });
        });

        tabs.init($('.tab-monitoring'));

        $('#subtab-osd').load('./tabs/osd.html', function() {
            osdTab.initialize();

            $('#subtab-osd .tab-osd .tab_title').hide()

            $('#subtab-sensors').load('./tabs/sensors.html', function() {
                sensorsTab.initialize(callback);

                $('#subtab-sensors .tab-sensors .tab_title').hide()

                GUI.active_tab = 'monitoring';
            });
        });


    }
};

monitoringTab.cleanup = function (callback) {
    if (callback) {
        callback();
    }
};

export default monitoringTab;