#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "🚀 Starting deployment process..."

# Install dependencies
echo "${GREEN}Installing dependencies...${NC}"
npm install --legacy-peer-deps || { echo "${RED}Failed to install dependencies${NC}" ; exit 1; }

# Run tests
echo "${GREEN}Running tests...${NC}"
npm test -- --watchAll=false || { echo "${RED}Tests failed${NC}" ; exit 1; }

# Build the application
echo "${GREEN}Building the application...${NC}"
npm run build || { echo "${RED}Build failed${NC}" ; exit 1; }

# Start the production server
echo "${GREEN}Starting production server...${NC}"
npm run serve

echo "${GREEN}✅ Deployment completed successfully!${NC}"
