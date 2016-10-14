(function ()
{
    'use strict';

    angular
        .module('app.dashboards.project')
        .controller('DashboardProjectController', DashboardProjectController);

    /** @ngInject */
    function DashboardProjectController($scope, $interval, $mdSidenav, DashboardData, dashboardFactory, dispensaryFactory)
    {
        var vm = this;
        var dispensaryId = 14;

        // Data
        vm.dashboardData = DashboardData;

        // Widget 5
        vm.salesCharts = {
            title       : vm.dashboardData.stackBarGraph.title,
            mainChart   : {
                config : {
                    refreshDataOnly: true,
                    deepWatchData  : true
                },
                options: {
                    chart: {
                        type        : 'multiBarChart',
                        color       : ['#03a9f4', '#b3e5fc'],
                        height      : 420,
                        margin      : {
                            top   : 8,
                            right : 16,
                            bottom: 32,
                            left  : 32
                        },
                        clipEdge    : true,
                        groupSpacing: 0.3,
                        reduceXTicks: false,
                        stacked     : true,
                        duration    : 250,
                        x           : function (d)
                        {
                            return d.salesDay;
                        },
                        y           : function (d)
                        {
                            return d.sales;
                        },
                        yAxis       : {
                            tickFormat: function (d)
                            {
                                return d;
                            }
                        },
                        legend      : {
                            margin: {
                                top   : 8,
                                bottom: 32
                            }
                        },
                        controls    : {
                            margin: {
                                top   : 8,
                                bottom: 32
                            }
                        },
                        tooltip     : {
                            gravity: 's',
                            classes: 'gravity-s'
                        }
                    }
                },
                data   : []
            },
            days        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            ranges      : vm.dashboardData.stackBarGraph.ranges,
            currentRange: 'tw',
            changeRange : function (range)
            {
                vm.salesCharts.currentRange = range;

                /**
                 * Update main chart data by iterating through the
                 * chart dataset and separately adding every single
                 * dataset by hand.
                 *
                 * You MUST NOT swap the entire data object by doing
                 * something similar to this:
                 * vm.widget.mainChart.data = chartData
                 *
                 * It would be easier but it won't work with the
                 * live updating / animated charts due to how d3
                 * works.
                 *
                 * If you don't need animated / live updating charts,
                 * you can simplify these greatly.
                 */
                angular.forEach(vm.dashboardData.stackBarGraph.mainChart, function (chartData, index)
                {
                    vm.salesCharts.mainChart.data[index] = {
                        key   : chartData.key,
                        values: chartData.values[range.toLowerCase()]
                    };
                });

                /**
                 * Do the same thing for the supporting widgets but they
                 * only have 1 dataset so we can do [0] without needing to
                 * iterate through in their data arrays
                 */
                angular.forEach(vm.dashboardData.stackBarGraph.supporting, function (widget, name)
                {
                    vm.salesCharts.supporting.widgets[name].chart.data[0] = {
                        key   : widget.chart.key,
                        values: widget.chart.values[range.toLowerCase()]
                    };
                });
            },
            init        : function ()
            {
                // Run this function once to initialize widget

                /**
                 * Update the range for the first time
                 */
                vm.salesCharts.changeRange('TW');
            }
        };

        // Now widget
        vm.nowWidget = {
            now   : {
                second: '',
                minute: '',
                hour  : '',
                day   : '',
                month : '',
                year  : ''
            },
            ticker: function ()
            {
                var now = moment();
                vm.nowWidget.now = {
                    second : now.format('ss'),
                    minute : now.format('mm'),
                    hour   : now.format('HH'),
                    day    : now.format('D'),
                    weekDay: now.format('dddd'),
                    month  : now.format('MMMM'),
                    year   : now.format('YYYY')
                };
            }
        };

        // Weather widget
        vm.weatherWidget = vm.dashboardData.weatherWidget;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.selectProject = selectProject;


        // Initialize Sales Charts for the dashboard
        vm.salesCharts.init();


        // Now widget ticker
        vm.nowWidget.ticker();

        var nowWidgetTicker = $interval(vm.nowWidget.ticker, 1000);

        $scope.$on('$destroy', function ()
        {
            $interval.cancel(nowWidgetTicker);
        });

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Select project
         */
        function selectProject(project)
        {
            vm.selectedProject = project;
        }

        dashboardFactory.getDashboardData(dispensaryId).then(
                function(data) {
                   vm.dashData = data;
                }
            );

        dispensaryFactory.getByDispensaryDrivers(dispensaryId).then(
                function(data) {
                    vm.driverData = data;
                }
            );

        dispensaryFactory.getByDispensaryCustomers(dispensaryId).then(
                function(data) {
                    vm.customerData = data;
                }
            );
    }

})();
