# 3D Inverse Kinematics
P5js/WEBGL implementation of 3D Forward And Backward Reaching Inverse Kinematics.

## Introduction
Due to considerable increase in automation since last couple of decades, robots became essential part of our life. We are surrounded by automated system ranging from Industrial assembly line robot to spacecraft docking arm.
Since tasks that robot can perform are getting more complicated and it is difficult to find analytical solution for such closely coupled nonlinear systems.
With availability of faster computing units, it is possible to compute solution with numerical iterative procedures in real-time, making system more responsive to surrounding environment.
Goal of project is to compute Forward Kinematics and Inverse Kinematics of 3 Dimensional robotic manipulator whose structure and configuration might change in real time, a universal iterative solver which can be used with any robotic arm with minimum possible efforts.
The term Forward Kinematics is Computing the position of the end effector from known joint positions, orientation and link lengths. Contrarily Inverse Kinematics is estimation of the joint states necessary to reach desired position.
[Demo](http://siroi.co.in/apps/InverseKinematics3D/)

TODO :
1. Visualize indivisial Joint angles.
2. Joint constraints.
3. Link Collision avoidance
