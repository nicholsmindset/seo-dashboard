#!/bin/bash

# Exit on any error
set -e

# Check if there are any uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "Error: There are uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Determine version bump type
VERSION_TYPE=${1:-patch}

# Install dependencies
echo "Installing dependencies..."
npm install

# Run tests
echo "Running tests..."
npm test

# Build the project
echo "Building project..."
npm run build

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npm run deploy

# Update version
echo "Updating version..."
if [ "$VERSION_TYPE" = "major" ]; then
    npm run version:major
elif [ "$VERSION_TYPE" = "minor" ]; then
    npm run version:minor
else
    npm run version:patch
fi

# Push changes
echo "Pushing changes to repository..."
git push origin main

echo "Deployment completed successfully!"
