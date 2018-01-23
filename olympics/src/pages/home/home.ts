import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import jQuery from "jquery";
// import * as d3 from 'd3';

import { Sports } from '../../providers/sports';
import { ActivityPage } from '../activity/activity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sport: string = '';

  public temp = Array;
  public math = Math;

  /// Graphic elements
  // private m_Margin = {top: 20, right: 0, bottom: 30, left: 110};
  // private m_Width: number;
  // private m_Height: number;

  constructor(public navCtrl: NavController, public sports: Sports) {
  }

  ngAfterViewInit(){
      // let l_WindowWidth  = jQuery(window).width();
      // let l_WindowHeight  = jQuery(window).height();

      // this.m_Width = (l_WindowWidth * 2) - this.m_Margin.left - this.m_Margin.right;
      // this.m_Height = l_WindowHeight - this.m_Margin.top - this.m_Margin.bottom;

      // this.createButton();
  }

  /*private createButton(){
    let sport_names: Array<string> = new Array(this.sports.length);
    for (var i = 0; i < this.sports.length ; ++i)
      sport_names.push(this.sports[i].name);

    let l_ImgWidth = 60;
    let l_ImgHeight = 45;
    let l_OuterRadius = this.m_Height / 2 - 20 ;
    let l_InnerRadius = l_OuterRadius / 3;

    let l_Radius: any = Math.min(this.m_Width, this.m_Height) / 2;

    /// Set the arc
    let l_Arc: any = d3.arc()
        .outerRadius(l_Radius - 30)
        .innerRadius(0);
    let l_ArcExpend: any = d3.arc()
        .outerRadius(l_Radius)
        .innerRadius(0);

    /// Set the label arc
    let l_LabelArc: any = d3.arc()
       .outerRadius(l_Radius - 90)
       .innerRadius(l_Radius - 90);

    /// Set the pie
    let l_Pie: any = d3.pie()
       //.sort((d: any) => d.Level)
       .value((d: any) => 1/6)

       /// Select the div and set the dimensions
    let l_Svg: any = d3.select("#main-button")
        .append("svg")
        .attr("width", '70%')
        .attr("height", '70%')
        .attr('viewBox','0 0 '+ Math.min(this.m_Width,this.m_Height) + ' ' + Math.min(this.m_Width,this.m_Height))
        .append("g")
        .attr("transform", "translate(" + Math.min(this.m_Width,this.m_Height) / 2 + "," + Math.min(this.m_Width,this.m_Height) / 2 + ")");

    /// Set the data and the function on click
    let l_G: any = l_Svg.selectAll(".arc")
        .data(sport_names)
        .enter().append("g")
        .attr("class", "arc")
        .on("click", function(d: any) {
            l_DOMMoodImg.css("background-image", 'url("' + l_Imgs[d.data.Level] + '2.png")' );
            l_DOMPiePercent.html(d.data.Percent + "%");
            l_DOMMoodWord.html(l_MoodsWord[d.data.Level] + " : ");
            l_DOMMoodWord.css("color", l_Colors[d.data.Level]);

            /// Reset size of all images on pie chart
            d3.selectAll(".LabelImg").transition()
                .attr("width", l_ImgWidth)
                .attr("height", l_ImgHeight)
                .attr("x",-1*(l_ImgWidth)/2)
                .attr("y",-1*(l_ImgHeight)/2);

            /// Increase the size of the image for selected element
            d3.select("#MoodImg" + d.data.Level).transition()
                .attr("width", l_ImgWidth + 30)
                .attr("height", l_ImgHeight + 30)
                .attr("x",-1*(l_ImgWidth + 30)/2)
                .attr("y",-1*(l_ImgHeight + 30)/2);

            /// Reset size of all parts of the pie chart
            l_G.select("path").transition()
                .attr("d", l_Arc)
                .style("stroke-width", 4)
                .duration(500);

            /// Increase the size of selected part
            d3.select(this).select("path").transition()
                .attr("d", l_ArcExpend)
                .style("stroke-width", 8)
                .duration(500);
        });

    /// Set the colors
    l_G.append("path").attr("d", l_Arc)
        .style("fill", (d: any) => l_Color(d.data.Level) );

    /// Set the images on each arc
    l_G.append("g")
        .attr("transform", (d: any) => "translate(" + l_LabelArc.centroid(d) + ")")
        .attr("dy", ".35em")
        .append("svg:image")
        .attr("xlink:href", (d: any) => l_Imgs[d.data.Level] + ".png")
        .attr("class", function (d: any) {
            if (d.data.Percent < 6)
                return "Hidden";
            else
                return "LabelImg";
        })
        .attr("id", (d: any) => "MoodImg" + d.data.Level)
        .attr("width", l_ImgWidth)
        .attr("height", l_ImgHeight)
        .attr("x",-1*(l_ImgWidth)/2)
        .attr("y",-1*(l_ImgHeight)/2);
  }*/

  public chooseActivity(activity: string) {
    if (jQuery("#start-button").prop("disabled") == true)
    {
      jQuery("#start-button").prop("disabled", false);
      jQuery("#start-button").prop("enabled", true);
    }
  }

  public startActivity(sport) {
    this.navCtrl.push(ActivityPage, { 'sport': sport });
  }
}
