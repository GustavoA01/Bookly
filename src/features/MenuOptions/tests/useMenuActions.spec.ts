import { renderHook, act } from '@testing-library/react';
import { useMenuActions } from '../hooks/useMenuActions';

const mockSetOpenSheet = jest.fn();
const mockSetOpenModal = jest.fn();

describe('useMenuActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderHookComponent = () =>
    renderHook(() => useMenuActions(mockSetOpenSheet, mockSetOpenModal));

  it('should initialize with all states as false', () => {
    const { result } = renderHookComponent();

    expect(result.current.openConfirmModal).toBe(false);
    expect(result.current.openUserNameDialog).toBe(false);
    expect(result.current.openPasswordDialog).toBe(false);
  });

  it('should set openConfirmModal to true when handleLogout is called', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.handleLogout();
    });

    expect(result.current.openConfirmModal).toBe(true);
  });

  it('should set openUserNameDialog to true and close sheets/modals when handleOpenUserNameDialog is called', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.handleOpenUserNameDialog();
    });

    expect(mockSetOpenSheet).toHaveBeenCalledWith(false);
    expect(mockSetOpenModal).toHaveBeenCalledWith(false);
    expect(result.current.openUserNameDialog).toBe(true);
  });

  it('should set openPasswordDialog to true and close sheets/modals when handleOpenPasswordDialog is called', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.handleOpenPasswordDialog();
    });

    expect(mockSetOpenSheet).toHaveBeenCalledWith(false);
    expect(mockSetOpenModal).toHaveBeenCalledWith(false);
    expect(result.current.openPasswordDialog).toBe(true);
  });

  it('should allow manually setting openConfirmModal', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.setOpenConfirmModal(true);
    });

    expect(result.current.openConfirmModal).toBe(true);

    act(() => {
      result.current.setOpenConfirmModal(false);
    });

    expect(result.current.openConfirmModal).toBe(false);
  });

  it('should allow manually setting openUserNameDialog', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.setOpenUserNameDialog(true);
    });

    expect(result.current.openUserNameDialog).toBe(true);

    act(() => {
      result.current.setOpenUserNameDialog(false);
    });

    expect(result.current.openUserNameDialog).toBe(false);
  });

  it('should allow manually setting openPasswordDialog', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.setOpenPasswordDialog(true);
    });

    expect(result.current.openPasswordDialog).toBe(true);

    act(() => {
      result.current.setOpenPasswordDialog(false);
    });

    expect(result.current.openPasswordDialog).toBe(false);
  });

  it('should not close sheets/modals when handleLogout is called', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.handleLogout();
    });

    expect(mockSetOpenSheet).not.toHaveBeenCalled();
    expect(mockSetOpenModal).not.toHaveBeenCalled();
  });

  it('should handle multiple calls to handleOpenUserNameDialog', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.handleOpenUserNameDialog();
    });

    expect(mockSetOpenSheet).toHaveBeenCalledTimes(1);
    expect(mockSetOpenModal).toHaveBeenCalledTimes(1);
    expect(result.current.openUserNameDialog).toBe(true);

    // Reset states
    act(() => {
      result.current.setOpenUserNameDialog(false);
    });

    act(() => {
      result.current.handleOpenUserNameDialog();
    });

    expect(mockSetOpenSheet).toHaveBeenCalledTimes(2);
    expect(mockSetOpenModal).toHaveBeenCalledTimes(2);
    expect(result.current.openUserNameDialog).toBe(true);
  });

  it('should handle multiple calls to handleOpenPasswordDialog', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.handleOpenPasswordDialog();
    });

    expect(mockSetOpenSheet).toHaveBeenCalledTimes(1);
    expect(mockSetOpenModal).toHaveBeenCalledTimes(1);
    expect(result.current.openPasswordDialog).toBe(true);

    act(() => {
      result.current.setOpenPasswordDialog(false);
    });

    act(() => {
      result.current.handleOpenPasswordDialog();
    });

    expect(mockSetOpenSheet).toHaveBeenCalledTimes(2);
    expect(mockSetOpenModal).toHaveBeenCalledTimes(2);
    expect(result.current.openPasswordDialog).toBe(true);
  });

  it('should maintain independent state values', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.handleOpenUserNameDialog();
    });

    expect(result.current.openUserNameDialog).toBe(true);
    expect(result.current.openPasswordDialog).toBe(false);
    expect(result.current.openConfirmModal).toBe(false);

    act(() => {
      result.current.handleOpenPasswordDialog();
    });

    expect(result.current.openUserNameDialog).toBe(true);
    expect(result.current.openPasswordDialog).toBe(true);
    expect(result.current.openConfirmModal).toBe(false);
  });
});
