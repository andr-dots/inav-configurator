'use strict';

// This file is based on pid_tuning.js

const path = require('path');

const { GUI, TABS } = require('./../js/gui');
const tabs = require('./../js/tabs');
const Settings = require('./../js/settings');
const i18n = require('./../js/localization');
const osd = require('./osd.js');
const sensors = require('./sensors.js');

TABS.monitoring = {
    rateChartHeight: 117
};

TABS.monitoring.initialize = function (callback) {

    if (GUI.active_tab != 'monitoring') {
        GUI.active_tab = 'monitoring';
    }

    GUI.load(path.join(__dirname, "monitoring.html"), Settings.processHtml(process_html));

    function process_html() {
        // translate to user-selected language
        i18n.localize();



        GUI.simpleBind();

        // UI Hooks

        $('a.refresh').on('click', function () {
            $("#content-watermark").remove();
            $(".tab-monitoring").remove();

            GUI.tab_switch_cleanup(function () {
                TABS.monitoring.initialize();
            });
        });

        tabs.init($('.tab-monitoring'));

        $('#subtab-osd').load('./tabs/osd.html', function() {
            TABS.osd.initialize();

            $('#subtab-sensors').load('./tabs/sensors.html', function() {
                TABS.sensors.initialize(callback);

                GUI.active_tab = 'monitoring';
            });
        });


    }
};

TABS.monitoring.cleanup = function (callback) {
    if (callback) {
        callback();
    }
};
