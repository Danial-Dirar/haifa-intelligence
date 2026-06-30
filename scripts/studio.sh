#!/usr/bin/env bash
#
# studio.sh — bring up the whole Haifa Studio GPU backend in one tmux session.
#
# Panes:  [0] ComfyUI   [1] bridge (apps/api)   [2] ngrok (permanent domain)
# cloudflared is NOT needed anymore — the ngrok static domain replaced it.
#
#   studio.sh            # up + attach (default)
#   studio.sh down       # stop everything
#   studio.sh status     # is it running? is it paused?
#   studio.sh attach     # re-attach to the running session
#   studio.sh pause      # keep running, but turn the public studio OFFLINE
#                        #   (use while gaming so jobs don't fight for the GPU)
#   studio.sh resume     # bring the public studio back online
#
# Detach WITHOUT stopping anything:  Ctrl-b  then  d
#
set -euo pipefail

SESSION="studio"
COMFY_DIR="$HOME/AI/ComfyUI"
REPO_DIR="$HOME/Development/Haifa Intelligence"
NGROK_URL="https://undemonstrable-toya-biauricular.ngrok-free.dev"
PAUSE_FILE="$REPO_DIR/apps/api/.paused"   # must match STUDIO_PAUSE_FILE in the bridge

case "${1:-up}" in
  up)
    if tmux has-session -t "$SESSION" 2>/dev/null; then
      echo "✓ studio already running — attaching (detach: Ctrl-b then d)"
      exec tmux attach -t "$SESSION"
    fi

    echo "▶ Bringing up Haifa Studio: ComfyUI + bridge + ngrok…"

    # Pane 0 — ComfyUI (in its venv, listening so the bridge can reach it)
    tmux new-session -d -s "$SESSION" -c "$COMFY_DIR"
    tmux send-keys -t "$SESSION" \
      "source venv/bin/activate.fish; python main.py --listen 0.0.0.0 --port 8188" C-m

    # Pane 1 — the bridge (fronts ComfyUI, holds the WS for live progress)
    tmux split-window -h -t "$SESSION" -c "$REPO_DIR"
    tmux send-keys -t "$SESSION" "npm run start --workspace api" C-m

    # Pane 2 — ngrok on the fixed domain (port 8189 = the bridge)
    tmux split-window -h -t "$SESSION" -c "$REPO_DIR"
    tmux send-keys -t "$SESSION" "ngrok http 8189 --url=$NGROK_URL" C-m

    tmux select-layout -t "$SESSION" even-horizontal
    echo "✓ launched. Attaching… (detach without stopping: Ctrl-b then d)"
    exec tmux attach -t "$SESSION"
    ;;

  down|stop)
    tmux kill-session -t "$SESSION" 2>/dev/null \
      && echo "✓ studio stopped (ComfyUI + bridge + ngrok)" \
      || echo "studio is not running"
    ;;

  pause)
    touch "$PAUSE_FILE"
    echo "⏸  studio PAUSED — public site now shows 'GPU offline'. Backend still runs."
    echo "   ('studio resume' to bring it back)"
    ;;

  resume)
    rm -f "$PAUSE_FILE"
    echo "▶  studio RESUMED — public site is back online."
    ;;

  status)
    if tmux has-session -t "$SESSION" 2>/dev/null; then
      echo "✓ studio is running — 'studio attach' to view"
    else
      echo "✗ studio is not running — 'studio' to start"
    fi
    if [ -f "$PAUSE_FILE" ]; then
      echo "⏸  paused (public site offline) — 'studio resume' to re-enable"
    else
      echo "▶  online (accepting jobs)"
    fi
    ;;

  attach)
    exec tmux attach -t "$SESSION"
    ;;

  *)
    echo "usage: studio {up|down|status|attach|pause|resume}"
    exit 1
    ;;
esac
