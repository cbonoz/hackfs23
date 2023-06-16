import { Button, Card, Col, Empty, Input, Modal, Row, Spin } from 'antd';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { abbreviate, getDateStringFromTimestamp, getRpcError, ipfsUrl, isEmpty } from '../util';
import { APP_NAME } from '../util/constants';
import CsvDownloadButton from 'react-json-to-csv'

import TextArea from 'antd/es/input/TextArea';
import { createTicket, getBoard, getTicketsForBoard } from '../util/polybase';

// This page should page a contractAddress path parameter enable a web3 transaction to credit a user with a link referral, 
// and then redirect to url stored in state
export default function BoardPage({ activeChain, account, provider }) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = useState()
    const [data, setData] = useState({})
    const [ticketName, setTicketName] = useState()
    const [ticketDescription, setTicketDescription] = useState()
    const [showAbout, setShowAbout] = useState(false)
    const [success, setSuccess] = useState(false)

    const hasBoard = !isEmpty(data)
    const { boardId } = useParams();

    async function submitTicket() {
        setLoading(true)
        try {
            const res = await createTicket(boardId, ticketName, ticketDescription, account)
            console.log('created ticket', res)
        } catch (e) {
            const err = getRpcError(e)
            console.error('Error creating ticket', e)
            setError("Could not create ticket: " + err)
        } finally {
            setLoading(false)
        }
    }

    async function load() {
        if (!boardId || !account) {
            return
        }
        setLoading(true)
        try {
            const res = await getBoard(boardId)
            // Unpack the response
            const board = res[0].data
            const tickets = await getTicketsForBoard(board.id)
            console.log('data', board, tickets)
            setData({ board, tickets })
        } catch (e) {
            console.log(e)
            let message = getRpcError(e)
            if (message.indexOf('call revert') !== -1) {
                message = 'You may be connected to the wrong network. Please check selected network and metamask and try again.'
            }

            setError('Board information could not be found: ' + message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (account) {
            setError(undefined)
            load()
        } else {
            setError('Please connect your wallet to continue.')
        }
    }, [provider, account])

    if (loading) {
        return <div>
            <Spin size="large" />
        </div>
    }

    const openAbout = () => {
        setShowAbout(true)
    }

    const { tickets, board } = data
    const logoUrl = ipfsUrl(board?.cid, 'logo.png')

    const hasTickets = !isEmpty(tickets);

    const sortedTickets = (tickets || []).sort((a, b) => {
        return a.data.createdAt > b.data.createdAt
    })

    return (
        <div>
            {/* {JSON.stringify(data)} */}
            {error && <div>
                <span className='error-text'>{error}</span></div>}

            {logoUrl &&
                <div>
                    <img src={logoUrl} className='board-logo' />
                    <h1>{board.name}</h1>
                    <h3>{board.description}</h3>
                    <h5>Board first created:{getDateStringFromTimestamp(board.createdAt, false)}</h5>
                </div>}

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    {/* Create new ticket */}
                    <Card className="create-form white boxed" title={`Create a new ${APP_NAME} ticket`}>
                        <form>
                            <h1>Create ticket</h1>


                            <Input
                                value={ticketName}
                                onChange={e => setTicketName(e.target.value)}
                                placeholder="Add ticket name (required)"
                                prefix="Ticket name" />

                            <br />

                            <TextArea
                                value={ticketDescription}
                                onChange={e => setTicketDescription(e.target.value)}
                                placeholder='Add ticket description (required)'
                                prefix="Ticket description" />

                            <br />

                            <Button type="primary"
                                onClick={submitTicket}
                                disabled={!ticketName || !ticketDescription || loading}
                                loading={loading}>
                                Submit ticket
                            </Button>

                        </form>

                    </Card>
                </Col>
                <Col span={12}>
                    {hasTickets && <div>
                        {/* Existing tickets */}
                        {sortedTickets.map((record, i) => {
                            const ticket = record.data
                            return <Card key={i} className="ticket white boxed" title={ticket.name}>
                                <h5>{ticket.description}</h5>
                                <p>Created at: {getDateStringFromTimestamp(ticket.createdAt, true)}</p>
                                <p>Author: {abbreviate(ticket.author)}</p>
                            </Card>
                        })}
                        <br/>
                        <CsvDownloadButton data={tickets.map(t => t.data)} />
                    </div>}
                    {!hasTickets && <div>
                        <p className='bold'>
                            <Empty
                                description="No feature tickets yet. Create one now!"
                            />
                        </p></div>}

                </Col>
            </Row>
            {/* <Modal
                title={<span className='success-text'>Referral successful</span>}
                open={success}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setSuccess(false)}>
                <hr />
                <h3>Proceed to page below</h3>
                <a href={fullRedirectUrl} rel="noreferrer">{fullRedirectUrl}</a>
                <br />
                <br />
                <p>Thanks for using {APP_NAME}!</p>
            </Modal> */}
        </div>
    )
}
