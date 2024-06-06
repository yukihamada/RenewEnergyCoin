#!/bin/bash

# ノードの起動
start_node() {
    echo "Starting node..."
    docker-compose up -d


# ノードの停止
stop_node() {
    echo "Stopping node..."
    docker-compose down
}

# ノードのステータス確認
status_node() {
    echo "Checking node status..."
    docker-compose ps
}

case "$1" in
    start)
        start_node
        ;;
    stop)
        stop_node
        ;;
    status)
        status_node
        ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        exit 1
esac

