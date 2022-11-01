#!/bin/bash
 
eval echo "Removing directory" "~$SUDO_USER""/.STMicroelectronics/stm32cubemonitor/"
while true; do
	read -p "This directory contains the settings and flows you have built. Do you want to delete this directory? [Y/n] " response

case $response in
	
        [Yy]* ) 
        echo "Removing directory..."
        eval rm -rf "~$SUDO_USER"/.STMicroelectronics/stm32cubemonitor
        exit 0; 
        break;;

        [Nn]* ) exit 0;;
	
    esac
	
done