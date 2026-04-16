set -e

# Source shell config to get ccz function (Z.ai API authentication)
source ~/.oh-my-zsh/custom/functions.zsh

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations> [claude_alias]"
  echo "  iterations    Number of Ralph loop iterations to run"
  echo "  claude_alias  Claude alias to use (default: ccz)"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPT_FILE="$SCRIPT_DIR/PROMPT.md"
CLAUDE_ALIAS="${2:-ccz}"

for ((i=1; i<=$1; i++)); do
  echo "Iteration $i"
  echo "-------------------------------------"
  # result=$(claude --permission-mode acceptEdits -p "@plans/prd.json @plans/progress.txt \ 
  # 1. Find the highest-priority feature to work on and work only on that feature. \
  # This should be the one YOU decide has the highest priority - not necessarily the first in the list. \
  # 2. Check that the linter passes via 'uv run ruff check', \
  # type check passes via 'uv run ty check' \
  # and that the tests pass via 'uv run pytest tests/ -v --tb=short 2>&1'. \
  # 3. Update the PRD with the work that was done. \
  # 4. Append your progress to the progress.txt file. \
  # 5. Make a git commit of that feature. \
  # ONLY WORK ON A SINGLE FEATURE. \
  # If, while implementing this feature, you notice that all work \
  # is complete, output <promise>COMPLETE</promise>. \
  # ")
  prompt=$(cat "$PROMPT_FILE")
  # ccz is aliased to zai api keys for claude, so we can use it to call the API directly with the prompt and permissions.
  result=$($CLAUDE_ALIAS --dangerously-skip-permissions -p "@$SCRIPT_DIR/prd.json @$SCRIPT_DIR/progress.txt $prompt")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete, exiting."
    exit 0
  fi
done