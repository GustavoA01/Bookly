import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { User } from 'firebase/auth';
import { UserIcon } from '../components/UserIcon';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };

  MockLink.displayName = 'Link';

  return MockLink;
});

describe('UserIcon', () => {
  const mockSetOpenSheet = jest.fn();
  const mockSetOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show skeleton when isLoading is true', () => {
    render(
      <UserIcon
        user={null}
        isLoading={true}
        setOpenSheet={mockSetOpenSheet}
        setOpenModal={mockSetOpenModal}
      />
    );

    const skeleton = document.querySelector('.rounded-full');
    expect(skeleton).toBeInTheDocument();
  });

  it('should show login button when there is no user', () => {
    render(
      <UserIcon
        user={null}
        isLoading={false}
        setOpenSheet={mockSetOpenSheet}
        setOpenModal={mockSetOpenModal}
      />
    );

    const loginButton = screen.getByText('Entrar');
    expect(loginButton).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/login');
  });

  it('should show avatar with the first letter of the name when user exists', () => {
    const mockUser = {
      displayName: 'João Silva',
    } as User;

    render(
      <UserIcon
        user={mockUser}
        isLoading={false}
        setOpenSheet={mockSetOpenSheet}
        setOpenModal={mockSetOpenModal}
      />
    );

    const avatarText = screen.getAllByText('J')[0];
    expect(avatarText).toBeInTheDocument();
  });

  it('should show avatar with uppercase letter', () => {
    const mockUser = {
      displayName: 'maria',
    } as User;

    render(
      <UserIcon
        user={mockUser}
        isLoading={false}
        setOpenSheet={mockSetOpenSheet}
        setOpenModal={mockSetOpenModal}
      />
    );

    const avatarText = screen.getAllByText('M')[0];
    expect(avatarText).toBeInTheDocument();
  });

  it('should call setOpenSheet when clicking avatar on mobile', () => {
    const mockUser = {
      displayName: 'João',
    } as User;

    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(
      <UserIcon
        user={mockUser}
        isLoading={false}
        setOpenSheet={mockSetOpenSheet}
        setOpenModal={mockSetOpenModal}
      />
    );

    const mobileAvatar = screen.getAllByText('J')[0].closest('.sm\\:hidden');
    fireEvent.click(mobileAvatar!);

    expect(mockSetOpenSheet).toHaveBeenCalledWith(true);
    expect(mockSetOpenModal).not.toHaveBeenCalled();
  });

  it('should handle undefined displayName', () => {
    const mockUser = {
      displayName: undefined,
    } as unknown as User;

    render(
      <UserIcon
        user={mockUser}
        isLoading={false}
        setOpenSheet={mockSetOpenSheet}
        setOpenModal={mockSetOpenModal}
      />
    );

    const avatar = document.querySelector('.cursor-pointer');
    expect(avatar).toBeInTheDocument();
  });

  it('should have cursor-pointer class on avatar', () => {
    const mockUser = {
      displayName: 'João',
    } as User;

    render(
      <UserIcon
        user={mockUser}
        isLoading={false}
        setOpenSheet={mockSetOpenSheet}
        setOpenModal={mockSetOpenModal}
      />
    );

    const avatar = document.querySelector('.cursor-pointer');
    expect(avatar).toHaveClass('cursor-pointer');
  });
});
