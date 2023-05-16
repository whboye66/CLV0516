#!/bin/sh
UUID=${UUID:-'adc43ea6-4808-4f33-907d-f4776a6ff279'}
sed -i "s#UUID#$UUID#g" ./config-vmess.json
