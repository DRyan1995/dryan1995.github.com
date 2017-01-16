# NOTES FOR DE1-SOC DEVELOPMENT


1. FIX COMPILE ISSUE:

~~~~
ALT_DEVICE_FAMILY ?= soc_cv_av

-I${SOCEDS_DEST_ROOT}/ip/altera/hps/altera_hps/hwlib/include/$(ALT_DEVICE_FAMILY)/ -D$(ALT_DEVICE_FAMILY)
~~~~
