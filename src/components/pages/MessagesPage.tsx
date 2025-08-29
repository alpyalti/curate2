import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  participants: string;
  entry: string;
  topic: string;
  lastMessageDate: string;
  isRead: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    participants: "Beauty Solutions",
    entry: "Order 00218000-A",
    topic: "Other question",
    lastMessageDate: "Aug 21, 2025, 2:33 PM",
    isRead: false,
  },
  {
    id: "2",
    participants: "Customer Support",
    entry: "Order 00217999-B",
    topic: "Delivery inquiry",
    lastMessageDate: "Aug 20, 2025, 1:15 PM",
    isRead: true,
  },
  {
    id: "3",
    participants: "Fashion Department",
    entry: "Order 00217998-C",
    topic: "Size exchange",
    lastMessageDate: "Aug 19, 2025, 10:45 AM",
    isRead: true,
  },
  {
    id: "4",
    participants: "Tech Support",
    entry: "General inquiry",
    topic: "Account access",
    lastMessageDate: "Aug 18, 2025, 3:22 PM",
    isRead: false,
  },
  {
    id: "5",
    participants: "Sales Team",
    entry: "Order 00217995-F",
    topic: "Product availability",
    lastMessageDate: "Aug 17, 2025, 11:30 AM",
    isRead: true,
  },
  {
    id: "6",
    participants: "Beauty Solutions",
    entry: "Order 00217994-G",
    topic: "Return request",
    lastMessageDate: "Aug 16, 2025, 4:45 PM",
    isRead: true,
  },
  {
    id: "7",
    participants: "Customer Support",
    entry: "Order 00217993-H",
    topic: "Payment issue",
    lastMessageDate: "Aug 15, 2025, 9:15 AM",
    isRead: false,
  },
  {
    id: "8",
    participants: "Fashion Department",
    entry: "Order 00217992-I",
    topic: "Color question",
    lastMessageDate: "Aug 14, 2025, 2:20 PM",
    isRead: true,
  },
  {
    id: "9",
    participants: "Tech Support",
    entry: "General inquiry",
    topic: "App feedback",
    lastMessageDate: "Aug 13, 2025, 5:10 PM",
    isRead: true,
  },
  {
    id: "10",
    participants: "Sales Team",
    entry: "Order 00217990-K",
    topic: "Bulk order",
    lastMessageDate: "Aug 12, 2025, 12:30 PM",
    isRead: false,
  },
  {
    id: "11",
    participants: "Beauty Solutions",
    entry: "Order 00217989-L",
    topic: "Product recommendation",
    lastMessageDate: "Aug 11, 2025, 7:45 AM",
    isRead: true,
  },
  {
    id: "12",
    participants: "Customer Support",
    entry: "Order 00217988-M",
    topic: "Shipping delay",
    lastMessageDate: "Aug 10, 2025, 3:15 PM",
    isRead: true,
  },
];

export function MessagesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;

  const { totalPages, startIndex, endIndex, currentMessages } = useMemo(() => {
    const totalPages = Math.ceil(mockMessages.length / messagesPerPage);
    const startIndex = (currentPage - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    const currentMessages = mockMessages.slice(startIndex, endIndex);

    return {
      totalPages,
      startIndex,
      endIndex,
      currentMessages,
    };
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Header with message count */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="text-sm text-gray-600">
            {mockMessages.length} Conversations - Showing {startIndex + 1}-{Math.min(endIndex, mockMessages.length)} of {mockMessages.length}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block border rounded-lg">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b font-medium text-gray-700 text-sm">
            <div>PARTICIPANTS</div>
            <div>ENTRY</div>
            <div>TOPIC</div>
            <div className="text-right">LAST MESSAGE DATE</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {currentMessages.map((message) => (
              <Link
                key={message.id}
                to={`/profile/messages/${message.id}`}
                className="block hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-4 gap-4 p-4 items-center">
                  {/* Participants */}
                  <div className="text-sm font-medium text-gray-900">
                    {message.participants}
                  </div>

                  {/* Entry */}
                  <div className="text-sm text-gray-600">
                    {message.entry}
                  </div>

                  {/* Topic */}
                  <div>
                    <span className="underline text-sm font-bold text-gray-600">
                      {message.topic}
                    </span>
                  </div>

                  {/* Last Message Date */}
                  <div className="text-right text-gray-600 text-sm">
                    {message.lastMessageDate}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {currentMessages.map((message) => (
          <Link
            key={message.id}
            to={`/profile/messages/${message.id}`}
            className="block"
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-700 truncate">
                        {message.topic}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-600">
                      {message.participants}
                    </div>
                    <div className="text-sm text-gray-500">
                      {message.entry}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      {message.lastMessageDate}
                    </div>
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Page
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="min-w-[2.5rem]"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Next Page
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
      </CardContent>
    </Card>
  );
}

export default MessagesPage;
