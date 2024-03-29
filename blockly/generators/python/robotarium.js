/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating Python for variable blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
 'use strict';


 

//This block creates a new robot
Blockly.Python['new_robot'] = function(block) {
  var text_name = block.getFieldValue('name');
  var number_x_val = block.getFieldValue('x_val');
  var number_y_val = block.getFieldValue('y_val');
  var angle_theta = block.getFieldValue('theta');
  var robot_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  if (robot_color == '') robot_color = '"black"';
   var code = `
curName = "`+text_name+`"
drawing = -1
message = 0
New_Robot(curName,`+number_x_val+`,`+number_y_val+`,`+angle_theta+`,`+robot_color+`)
`;
   return code;
 };

//This block runs the robot to a point and angle
Blockly.Python['run_to_point_and_angle'] = function(block) {
   var number_target_x = block.getFieldValue('target_x');
   var number_target_y = block.getFieldValue('target_y');
   var angle = block.getFieldValue('angle');   
   var code = "Add_Target_Point(curName,"+number_target_x+","+number_target_y+","+angle+",drawing, message)\n";
   return code;
 };

//This block runs the robot to a point and angle
Blockly.Python['run_to_point'] = function(block) {
  var number_target_x = block.getFieldValue('target_x');
  var number_target_y = block.getFieldValue('target_y');
  var code = "Add_Target_Point(curName,"+number_target_x+","+number_target_y+",0,drawing, message)\n";
  return code;
};

//This block puts the robots "pen" down
Blockly.Python['pen_down'] = function(block) {
  var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  if (color == "") color = "'#000000'";
  color = color.slice(2,-1);
  color = parseInt(color,16);
  var code = `
drawing = `+color+`
`;
  return code;
};

//This block pulls the robots "pen" up
Blockly.Python['pen_up'] = function(block) {
  var code = "drawing = -1\n";
  return code;
};

Blockly.Python['new_polygon'] = function(block) {
  var number_sides = block.getFieldValue('sides');
  var number_x = block.getFieldValue('x');
  var number_y = block.getFieldValue('y');
  var number_radius = block.getFieldValue('radius');
  var angle_angle = block.getFieldValue('angle');
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  if (value_color == "") value_color = "'#000000'";
  var code = `shapesList.append(robotarium.patches.RegularPolygon([`+number_x+`,`+number_y+`],`+number_sides+`, radius=`+number_radius+`, orientation=`+String(angle_angle*Math.PI/180)+`, color=`+value_color+`, zorder=-10))\n`;
  return code;
};

//This block changes the drawing type between actual or initial
Blockly.Python['drawing_type'] = function(block) {
  var dropdown_d_type = block.getFieldValue('D_type');
  var code = "drawingType = \""+dropdown_d_type+"\"\n";
  return code;
};

Blockly.Python['new_circle'] = function(block) {
  var number_x = block.getFieldValue('x');
  var number_y = block.getFieldValue('y');
  var number_radius = block.getFieldValue('radius');
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  if (value_color == "") value_color = "'#000000'";
  var code = `shapesList.append(robotarium.patches.Circle([`+number_x+`,`+number_y+`], radius=`+number_radius+`, color=`+value_color+`, zorder=-10))\n`;
  return code;
};

Blockly.Python['new_rec'] = function(block) {
  var number_x = block.getFieldValue('x');
  var number_y = block.getFieldValue('y');
  var number_w = block.getFieldValue('w');
  var number_h = block.getFieldValue('h');
  var angle_name = block.getFieldValue('NAME');
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  if (value_color == "") value_color = "'#000000'";
  var code = `shapesList.append(robotarium.patches.Rectangle([`+number_x+`,`+number_y+`], width=`+number_w+`, height=`+number_h+`, angle=`+String(angle_name)+`,color=`+value_color+`, zorder=-10))\n`;
  return code;
};

Blockly.Python['new_line'] = function(block) {
  var number_fx = block.getFieldValue('fx');
  var number_fy = block.getFieldValue('fy');
  var number_tx = block.getFieldValue('tx');
  var number_ty = block.getFieldValue('ty');
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  if (value_color == "") value_color = "'#000000'";
  var code = `lineList.append(lines.Line2D([`+number_fx+`,`+number_tx+`],[`+number_fy+`,`+number_ty+`],linewidth = 1, color=`+value_color+`, zorder=-10))\n`;
  return code;
};

//This block makes the robot turn by heading
Blockly.Python['turn_by_angle'] = function(block) {
  var angle_angle = block.getFieldValue('angle');
  var code = "robotList[namesList.index(curName)].turn("+angle_angle+",drawing, message)\n";
  return code;
};

//This block makes the robot move forward by distance
Blockly.Python['move_forward'] = function(block) {
  var number_distance = block.getFieldValue('distance');
  var code = "robotList[namesList.index(curName)].move_Forward("+number_distance+",drawing, message)\n";
  return code;
};

//This block makes the robot wait a specified time
Blockly.Python['wait'] = function(block) {
  var seconds = block.getFieldValue('seconds');
  var miliseconds = seconds * 1000
  miliseconds = parseInt((miliseconds + 3) * -1)
  var code = `robotList[namesList.index(curName)].move_Forward(0,`+miliseconds+`, message)\n`;
  return code;
};

//This block places an image
Blockly.Python['display_image'] = function(block) {
  var dropdown_image = block.getFieldValue('image');
  var number_x = block.getFieldValue('x');
  var number_y = block.getFieldValue('y');
  var number_s = block.getFieldValue('s');
  var code = `
#image@`+dropdown_image+`&
imageList.append([plt.imread(ImageRoot+'`+dropdown_image+`.png'),(`+number_x+`, `+number_x+`+`+number_s+`, `+number_y+`, `+number_y+`+`+number_s+`)])
`;
  return code;
};

Blockly.Python['display_Maze'] = function(block) {
  var dropdown_maze = block.getFieldValue('maze');
  var code = `
import mazeArrays
#image@maze`+dropdown_maze+`&

imageList.append([plt.imread(ImageRoot+'maze`+dropdown_maze+`.png'),(-1.6,1.6,-1,1)])

IfMaze = True
MazeNum = `+dropdown_maze+`

`;
  return code;
};

//This block turns to a spicific heading
Blockly.Python['turn_to'] = function(block) {
  var angle_angle = block.getFieldValue('angle');
  var code = "robotList[namesList.index(curName)].turn_To("+angle_angle+",drawing, message)\n";
  return code;
};

Blockly.Python['send_message'] = function(block) {
  var value_message = block.getFieldValue('message');
  // TODO: Assemble Python into code variable.
var code = `for i in messageList:
  if i[0] == '`+value_message+`':
    message = messageList.index(i)
    break 
else:
  messageList.append(["`+value_message+`",False])
  message = len(messageList)-1
Add_Target_Point(curName,robotList[namesList.index(curName)].target_points[-1][0],robotList[namesList.index(curName)].target_points[-1][1],robotList[namesList.index(curName)].target_points[-1][2] *180/math.pi,drawing, message) \n` ;
  return code;
};

Blockly.Python['wait_until_message'] = function(block) {
  var value_message = block.getFieldValue('message');
  // TODO: Assemble Python into code variable.
  var code = `for i in messageList:
  if i[0] == '`+value_message+`':
    message = messageList.index(i) *-1
    break 
else:
  message = len(messageList) *-1
  messageList.append(["`+value_message+`",False]) \n`;
  return code;
};