#!/bin/bash
#
# Script to automatically updates a version number
# Each time a this script is run the version number is changed to something random
#
# This version number is not meant to be the software version number
# This number can used to identify what code currently running
# If this number on the page corresponds with the number in the distribution you want
# You know the correct code is live
#
# Example: this script substitutes "version: 123as" with "version: kjsd93"

FILE_CONTAINING_THE_VERSION_NUMBER="./src/framework/visualisation/react/ui/pages/templates/footer.tsx"
LENGTH=5

generate_random_string() {
  local random_string=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w "$LENGTH" | head -n 1)
  echo "$random_string"
}

sed -i "s/version: [[:alnum:]]*/version: $(generate_random_string)/g" $FILE_CONTAINING_THE_VERSION_NUMBER  > /dev/null 2>&1
