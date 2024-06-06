import { Avatar, Button, Divider, Icon, Input, Sidebar } from 'keep-react'
import React from 'react';

const NotificationBar = () => {
    return (
        <Sidebar className="space-y-2.5 max-lg:hidden w-72 bg-[#D9D9D9]">
            <Sidebar.Header >
                <section className="flex items-center justify-between">
                    <h5 className="font-bold text-black">
                        Notifications
                    </h5>
                </section>
            </Sidebar.Header>
        </Sidebar>
    );
}
export default NotificationBar;