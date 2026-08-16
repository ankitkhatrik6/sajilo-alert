import { describe, it, expect, vi } from 'vitest';
import { alert } from '../src';

describe('SajiloAlert - Undo Functionality', () => {
  it('shows undo button and executes callback only on click', () => {
    const onUndoMock = vi.fn();

    alert.undo({
      message: 'फाइल हटाइयो।',
      duration: 5000,
      onUndo: onUndoMock,
    });

    const undoBtn = document.querySelector<HTMLButtonElement>('.sa-btn-undo');
    expect(undoBtn).not.toBeNull();
    expect(onUndoMock).not.toHaveBeenCalled();

    undoBtn?.click();
    expect(onUndoMock).toHaveBeenCalledTimes(1);
  });

  it('guarantees onUndo is never executed twice', () => {
    const onUndoMock = vi.fn();

    alert.undo({
      message: 'फाइल मेटियो',
      onUndo: onUndoMock,
    });

    const undoBtn = document.querySelector<HTMLButtonElement>('.sa-btn-undo');
    undoBtn?.click();
    undoBtn?.click();

    expect(onUndoMock).toHaveBeenCalledTimes(1);
  });
});
