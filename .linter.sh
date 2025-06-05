#!/bin/bash
cd /home/kavia/workspace/code-generation/moodvibe-31139-4258101b/moodvibe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

